package net.creeperhost.creeperlauncher.instance.importer.providers;

import com.google.gson.JsonElement;
import net.creeperhost.creeperlauncher.instance.importer.meta.InstanceSummary;
import net.creeperhost.creeperlauncher.util.GsonUtils;
import net.creeperhost.creeperlauncher.util.Result;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Files;
import java.nio.file.Path;

public class ModrinthProvider implements InstanceProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(ModrinthProvider.class);

    @Override
    @Nullable
    public InstanceSummary scanForInstance(Path instancePath) {
        Path profilePath = instancePath.resolve("profile.json");
        if (Files.notExists(profilePath)) return null;

        var instanceData = GsonUtils.parseRawSafe(instancePath.resolve("profile.json"));
        if (instanceData == null) {
            return null;
        }

        // Handle errors (basically just throw)
        // TODO: java version
        var name = GsonUtils.getNestedField("metadata.name", instanceData, JsonElement::getAsString);
        var minecraftVersion = GsonUtils.getNestedField("metadata.game_version", instanceData, JsonElement::getAsString);

        return new InstanceSummary(name, instancePath, minecraftVersion, null);
    }

    @Override
    public Result<Boolean, String> importInstance(Path instancePath) {
        return Result.err("Not implemented");
    }
}
