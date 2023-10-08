package net.creeperhost.creeperlauncher.instance.importer.providers;

import com.google.gson.JsonElement;
import net.creeperhost.creeperlauncher.instance.importer.meta.SimpleInstanceInfo;
import net.creeperhost.creeperlauncher.util.Result;
import org.jetbrains.annotations.Nullable;

import java.nio.file.Path;
import java.util.List;

public abstract class PrismLikeProvider implements InstanceProvider {
    @Override
    public Result<Boolean, String> importInstance(String identifier) {
        return Result.err("Not implemented");
    }

    @Override
    public List<SimpleInstanceInfo> getAllInstances() {
        return List.of();
    }

    @Override
    @Nullable
    public SimpleInstanceInfo getInstance(String instanceName) {
        return null;
    }

    @Override
    public Path getDataLocation() {
        return Path.of("./");
    }

    @Override
    @Nullable
    public JsonElement getDataFile(Path path) {
        return null;
    }
}