package dev.ftb.app.api.data.instances;

import dev.ftb.app.api.data.BaseData;
import org.jetbrains.annotations.Nullable;

import java.util.List;
import java.util.UUID;

public class LaunchInstanceData extends BaseData {
    public String uuid;
    public String extraArgs = "";
    public boolean cancelLaunch = false;
    public boolean offline = false;
    @Nullable
    public String offlineUsername;

    public static class Status extends BaseData {
        public UUID uuid;
        
        // The current step number (1-totalSteps)
        public int step;
        // The total number of steps that need to be executed.
        public int totalSteps;

        // Current step progress, between 0-1
        public float stepProgress;

        // Name for the step.
        public String stepDesc;

        // Human-readable step progress (xMB / yMB)
        @Nullable
        public String stepProgressHuman;

        public Status(UUID uuid, int step, int totalSteps, float stepProgress, String stepDesc, @Nullable String stepProgressHuman) {
            this.type = "launchInstance.status";
            this.uuid = uuid;
            this.step = step;
            this.totalSteps = totalSteps;
            this.stepProgress = stepProgress;
            this.stepDesc = stepDesc;
            this.stepProgressHuman = stepProgressHuman;
        }
    }

    public static class Reply extends BaseData {
        public String status;
        public String message;
        public UUID uuid;

        public Reply(LaunchInstanceData data, UUID uuid, String status, String message) {
            type = "launchInstance.reply";
            requestId = data.requestId;
            
            this.uuid = uuid;
            this.status = status;
            this.message = message;
        }
    }

    public static class Stopped extends BaseData {

        public final UUID instanceId;
        public final String status;
        public final int exitCode;

        public Stopped(UUID instanceId, String status, int exitCode) {
            type = "launchInstance.stopped";
            this.instanceId = instanceId;
            this.status = status;
            this.exitCode = exitCode;
        }
    }

    public static class Logs extends BaseData {

        // The UUID of the instance.
        public final UUID uuid;
        // The log messages to append.
        public final List<String> messages;

        public Logs(UUID instanceId, List<String> messages) {
            type = "launchInstance.logs";
            this.uuid = instanceId;
            this.messages = messages;
        }
    }
}
