package net.creeperhost.creeperlauncher.api.data.instances;

import net.creeperhost.creeperlauncher.api.data.BaseData;

/**
 * Created by covers1624 on 15/6/23.
 */
public class PollCloudInstancesData extends BaseData {

    public static class Reply extends BaseData {

        public final String status;
        public final String message;

        public Reply(String status, String message) {
            type = "pollCloudInstancesReply";
            this.status = status;
            this.message = message;
        }
    }
}
