package dev.ftb.app.pack;

import java.util.concurrent.CompletableFuture;

public class CancellationToken {

    private boolean isCanceled;

    public boolean isCanceled() {
        return isCanceled;
    }

    public void cancel(CompletableFuture<?> future) {
        cancel();
        future.cancel(true);
    }

    public void cancel(Thread thread) {
        cancel();
        thread.interrupt();
    }

    public void cancel() {
        isCanceled = true;
    }

    public void throwIfCancelled() {
        if (isCanceled()) {
            throw new Cancellation();
        }
    }

    public static class Cancellation extends RuntimeException {
    }
}
