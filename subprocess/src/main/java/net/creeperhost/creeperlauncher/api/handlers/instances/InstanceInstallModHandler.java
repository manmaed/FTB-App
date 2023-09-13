package net.creeperhost.creeperlauncher.api.handlers.instances;

import net.covers1624.quack.collection.FastStream;
import net.creeperhost.creeperlauncher.Instances;
import net.creeperhost.creeperlauncher.Settings;
import net.creeperhost.creeperlauncher.api.data.instances.InstanceInstallModData;
import net.creeperhost.creeperlauncher.api.data.instances.InstanceInstallModData.PendingInstall;
import net.creeperhost.creeperlauncher.api.handlers.IMessageHandler;
import net.creeperhost.creeperlauncher.data.InstanceModifications;
import net.creeperhost.creeperlauncher.data.modpack.ModpackVersionManifest;
import net.creeperhost.creeperlauncher.install.ModInstaller;
import net.creeperhost.creeperlauncher.pack.Instance;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

public class InstanceInstallModHandler implements IMessageHandler<InstanceInstallModData> {

    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public void handle(InstanceInstallModData data) {
        Instance instance = Instances.getInstance(data.uuid);
        if (instance == null) {
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "error", "Instance does not exist."));
            return;
        }

        String mcVersion = instance.versionManifest.getTargetVersion("game");
        if (mcVersion == null) {
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "error", "Instance does not have a game version??"));
            return;
        }

        InstanceModifications modifications = instance.getModifications();
        ModpackVersionManifest.Target modLoader = modifications != null ? modifications.getModLoaderOverride() : null;
        if (modLoader == null) {
            modLoader = instance.versionManifest.findTarget("modloader");
        }

        if (modLoader == null) {
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "error", "Instance does not have a ModLoader installed."));
            return;
        }

        ModInstaller modInstaller = new ModInstaller(instance, mcVersion, modLoader.getName());

        try {
            modInstaller.resolve(data.modId, data.versionId);
        } catch (ModInstaller.ModInstallerException ex) {
            LOGGER.warn("Error whilst preparing Mod install.", ex);
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "error", ex.getMessage()));
            return;
        }

        // TODO, ModInstaller actually has the unavailable/unsatisifable dependency list available. We should tell the user this.

        List<PendingInstall> pending = FastStream.of(modInstaller.getToInstall())
                .map(e -> new PendingInstall(e.getKey().getId(), e.getValue().getId()))
                .toList();
        Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "processing", "Processing install.", pending));

        try {
            modInstaller.install();
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "success", "Install successful."));
        } catch (ModInstaller.ModInstallerException ex) {
            LOGGER.warn("Error whilst installing mods.", ex);
            Settings.webSocketAPI.sendMessage(new InstanceInstallModData.Reply(data, "error", ex.getMessage()));
        }
    }
}
