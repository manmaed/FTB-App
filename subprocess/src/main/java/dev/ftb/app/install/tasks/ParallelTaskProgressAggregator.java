package dev.ftb.app.install.tasks;

import java.util.concurrent.atomic.AtomicLong;

/**
 * An implementation of {@link TaskProgressAggregator} capable
 * of safely consuming data from multiple {@link Task}s from
 * multiple threads.
 */
public class ParallelTaskProgressAggregator extends TaskProgressAggregator {

    private final ThreadLocal<AtomicLong> lastProcessed = ThreadLocal.withInitial(AtomicLong::new);
    private final AtomicLong processed = new AtomicLong();

    public ParallelTaskProgressAggregator(TaskProgressListener parent) {
        super(parent);
    }

    @Override
    public void update(long processed) {
        AtomicLong lastProcessed = this.lastProcessed.get();
        parent.update(this.processed.addAndGet(processed - lastProcessed.get()));
        lastProcessed.set(processed);
    }

    @Override
    public void start(long total) {
        lastProcessed.get().set(0);
    }

    @Override
    public long getProcessed() {
        return processed.get();
    }
}
