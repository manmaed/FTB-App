package net.creeperhost.creeperlauncher.migration.migrations;

import net.creeperhost.creeperlauncher.Constants;
import net.creeperhost.creeperlauncher.Instances;
import net.creeperhost.creeperlauncher.migration.Migration;
import net.creeperhost.creeperlauncher.pack.Instance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collection;

/**
 * We no longer apply {@link net.creeperhost.creeperlauncher.Constants#MOJANG_DEFAULT_ARGS} to the JVM
 * by default, instead we apply them to the instance. This migration will move the default JVM args onto
 * all instances that have not been modified.
 * 
 * @since 1.25.18
 */
public class MigrateJVMDefaultsToInstances implements Migration {
    private static final Logger LOGGER = LoggerFactory.getLogger(MigrateJVMDefaultsToInstances.class);
    
    @Override
    public String id() {
        return "migrate_jvm_defaults_to_instances";
    }

    @Override
    public boolean migrate() {
        Collection<Instance> instances = Instances.allInstances();
        if (instances.isEmpty()) {
            return true; // Nothing to migrate
        }
        
        // Loop over all the instances and attempt to apply the default JVM args
        for (Instance instance : instances) {
            if (!instance.props.jvmArgs.isEmpty()) {
                continue; // Skip instances that have already been modified
            }
            
            instance.props.jvmArgs = String.join(" ", Constants.MOJANG_DEFAULT_ARGS);
            try {
                instance.saveJson();
                LOGGER.info("\tMigrated instance {}({}) to use default JVM args", instance.getName(), instance.getUuid());
            } catch (IOException e) {
                LOGGER.error("Failed to save instance json for instance {}", instance.getUuid(), e);
                return false;
            }
        }
        
        return true;
    }
}