package net.creeperhost.creeperlauncher.api.handlers.instances;

//import io.sentry.Sentry;
import net.creeperhost.creeperlauncher.CreeperLauncher;
import net.creeperhost.creeperlauncher.Instances;
import net.creeperhost.creeperlauncher.api.WebSocketHandler;
import net.creeperhost.creeperlauncher.api.data.instances.LaunchInstanceData;
import net.creeperhost.creeperlauncher.api.handlers.IMessageHandler;
import net.creeperhost.creeperlauncher.pack.CancellationToken;
import net.creeperhost.creeperlauncher.pack.Instance;
import net.creeperhost.creeperlauncher.pack.InstanceLaunchException;
import net.creeperhost.creeperlauncher.pack.InstanceLauncher;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import static net.creeperhost.creeperlauncher.util.Log4jMarkers.NO_SENTRY;
import static net.creeperhost.creeperlauncher.util.Log4jMarkers.SENTRY_ONLY;

public class LaunchInstanceHandler implements IMessageHandler<LaunchInstanceData> {

    private static final Logger LOGGER = LogManager.getLogger();

    @Override
    public void handle(LaunchInstanceData data) {
        String _uuid = data.uuid;
        UUID uuid = UUID.fromString(_uuid);
        Instance instance = Instances.getInstance(uuid);
        InstanceLauncher launcher = instance.getLauncher();

        if (data.cancelLaunch && instance.prepareFuture != null && instance.prepareToken != null) {
            instance.prepareToken.cancel(instance.prepareFuture);
            WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "canceled", "Instance launch canceled."));
            return;
        }

        if (launcher.isRunning()) {
            WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "error", "Instance is already running."));
            return;
        }
        if (data.offline && StringUtils.isEmpty(data.offlineUsername)) {
            WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "error", "Offline username not specified."));
            return;
        }

        assert instance.prepareFuture == null;
        assert instance.prepareToken == null;

        instance.prepareToken = new CancellationToken();
        instance.prepareFuture = CompletableFuture.runAsync(() -> {
            LOGGER.info("Preparing instance for launch...");
            try {
                instance.play(instance.prepareToken, data.extraArgs, data.offline ? data.offlineUsername : null);
                WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "success", ""));
            } catch (InstanceLaunchException ex) {
                if (ex instanceof InstanceLaunchException.Abort) {
                    WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "abort", ex.getMessage()));
                } else {
                    LOGGER.error(NO_SENTRY, "Failed to launch instance.", ex);
                    Throwable cause = ex.getCause();
//                    Sentry.addBreadcrumb(ex.getMessage());
                    LOGGER.error(SENTRY_ONLY, "Failed to launch instance.", cause != null ? cause : ex);

                    String message = ex.getMessage();
                    if (cause != null) {
                        message += " because.. " + cause.getClass().getName() + ": " + cause.getMessage();
                    }

                    WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "error", message));
                }
            } catch (Throwable ex) {
                LOGGER.error("Unknown error whilst starting instance.", ex);
                WebSocketHandler.sendMessage(new LaunchInstanceData.Reply(data, "error", "Unexpected error whilst starting instance."));
            }
            instance.prepareToken = null;
            instance.prepareFuture = null;
        }, CreeperLauncher.INSTANCE_LAUNCHER_POOL);
    }
}
