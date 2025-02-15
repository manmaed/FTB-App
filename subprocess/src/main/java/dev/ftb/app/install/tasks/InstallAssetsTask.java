package dev.ftb.app.install.tasks;

import com.google.common.hash.Hashing;
import dev.ftb.app.Constants;
import dev.ftb.app.install.tasks.DownloadTask.DownloadValidation;
import dev.ftb.app.minecraft.jsons.AssetIndexManifest;
import dev.ftb.app.minecraft.jsons.VersionManifest;
import dev.ftb.app.pack.CancellationToken;
import org.apache.commons.lang3.tuple.Pair;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.nio.file.Path;
import java.util.*;

import static dev.ftb.app.Constants.MC_RESOURCES;

/**
 * Update/downloads assets for a given Minecraft version.
 */
public class InstallAssetsTask implements Task {

    private final List<DownloadTask> subTasks;
    private final AssetIndexManifest manifest;

    public InstallAssetsTask(VersionManifest.AssetIndex assetIndex) throws IOException {
        Pair<AssetIndexManifest, List<DownloadTask>> pair = buildTaskList(assetIndex);
        subTasks = pair.getValue();
        manifest = pair.getKey();
    }

    @Override
    public void execute(@Nullable CancellationToken token, @Nullable TaskProgressListener listener) throws Throwable {
        TaskProgressAggregator progressAggregator = null;
        if (listener != null) {
            long totalSize = subTasks.stream()
                    .map(DownloadTask::getValidation)
                    .mapToLong(e -> e.expectedSize)
                    .sum();
            listener.start(totalSize);
            progressAggregator = new ParallelTaskProgressAggregator(listener);
        }

        ParallelTaskHelper.executeInParallel(token, Task.TASK_POOL, subTasks, progressAggregator);

        if (listener != null) {
            listener.finish(progressAggregator.getProcessed());
        }
    }

    public boolean isRedundant() {
        return subTasks.isEmpty();
    }

    public AssetIndexManifest getResult() {
        return manifest;
    }

    /**
     * Build a linked list of tasks to Download/Update minecraft assets.
     *
     * @param assetIndex The asset index to download.
     * @return The list of tasks.
     */
    private static Pair<AssetIndexManifest, List<DownloadTask>> buildTaskList(VersionManifest.AssetIndex assetIndex) throws IOException {
        Path assetsDir = Constants.BIN_LOCATION.resolve("assets");
        AssetIndexManifest manifest = AssetIndexManifest.update(assetsDir, assetIndex);

        Path objectsDir = assetsDir.resolve("objects");

        Set<Path> seen = new HashSet<>();
        List<DownloadTask> tasks = new LinkedList<>();
        for (Map.Entry<String, AssetIndexManifest.AssetObject> entry : manifest.objects.entrySet()) {
            AssetIndexManifest.AssetObject object = entry.getValue();

            String loc = object.getPath();
            Path dest = objectsDir.resolve(loc);

            // Some vanilla assets (.ico files) have the same hash
            // this causes duplicate tasks to be added.
            if (!seen.add(dest)) continue;
            
            DownloadTask task = DownloadTask.builder()
                    .url(MC_RESOURCES + loc)
                    .dest(dest)
                    .tryResumeDownload()
                    .withValidation(DownloadValidation.of()
                            .withExpectedSize(object.getSize())
                            .withHash(Hashing.sha1(), object.getHash())
                    )
                    .build();
            if (!task.isRedundant()) {
                tasks.add(task);
            }
        }

        return Pair.of(manifest, tasks);
    }

}
