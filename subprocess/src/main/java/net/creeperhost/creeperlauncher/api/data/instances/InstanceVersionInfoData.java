package net.creeperhost.creeperlauncher.api.data.instances;

import net.creeperhost.creeperlauncher.api.data.BaseData;
import net.creeperhost.creeperlauncher.data.modpack.ModpackVersionManifest;
import org.jetbrains.annotations.Nullable;

import java.util.UUID;

/**
 * Created by covers1624 on 2/6/22.
 */
public class InstanceVersionInfoData extends BaseData {

    public UUID uuid;

    public static class Reply extends BaseData {

        public String status;
        public String message;
        @Nullable
        public ModpackVersionManifest versionManifest;

        public Reply(InstanceVersionInfoData data, String status, String message, @Nullable ModpackVersionManifest versionManifest) {
            this.type = "instanceVersionInfo";
            this.requestId = data.requestId;
            this.status = status;
            this.message = message;
            this.versionManifest = versionManifest;
        }
    }
}
