package dev.ftb.app.pack;

/**
 * Thrown when the instance is unable to be launched for a specific reason.
 * <p>
 */
public class InstanceLaunchException extends Exception {

    public InstanceLaunchException(String message) {
        super(message);
    }

    public InstanceLaunchException(String message, Throwable t) {
        super(message, t);
    }

    public static class Abort extends InstanceLaunchException {

        public Abort(String message) {
            super(message);
        }

        public Abort(String message, Throwable t) {
            super(message, t);
        }
    }
}
