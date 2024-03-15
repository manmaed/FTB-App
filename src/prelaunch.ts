import {logger} from '@/core/logger';
import {ipcRenderer} from 'electron';

logger.info("Hello from prelaunch.ts");

// Start a failsafe timer to launch the app after 30 seconds
setTimeout(() => {
  logger.error("Failsafe timer expired, launching app");
  
  // Get the #bypass-button
  const btn = document.getElementById('bypass-button');
  if (!btn) {
    logger.error("Failed to get #bypass-button");
    return;
  }
  
  btn.addEventListener('click', async () => {
    logger.info("Bypass button clicked");
    await ipcRenderer.invoke('app:launch');
  });
  
  btn.classList.remove('hidden');
}, 30000);

ipcRenderer.invoke('updater:check-for-update')
  .then(async (updater) => {
    logger.info("Received updater", updater, updater === null);
    if (updater === null) {
      // No update, continue
      await ipcRenderer.invoke('app:launch');
    } else {
      if (updater.downloadPromise) {
        logger.info("Waiting for download promise");
        updater.downloadPromise.then((e: any) => {
          logger.info("Download promise resolved", e);
        
          ipcRenderer.invoke('app:quit-and-install')
        })
      } else {
        await ipcRenderer.invoke('app:launch');
      }
    }
  })
  .catch((e) => {
    logger.error("Failed to get updater", e);
    // Just launch the app
    ipcRenderer.invoke('app:launch').catch((e) => logger.error("Failed to launch app", e));
  });

ipcRenderer.on('updater:checking-for-update', () => logger.info("Checking for update"));

ipcRenderer.on('updater:update-available', () => logger.info("Update available"));

ipcRenderer.on('updater:update-not-available', async() => {
  logger.info("Update not available");

  await ipcRenderer.invoke('app:launch')
});

ipcRenderer.on('updater:error', async (e) => {
  logger.error("Updater error", e);
  await ipcRenderer.invoke('app:launch')
});

ipcRenderer.on('updater:download-progress', (progress) => logger.info("Download progress", progress));

ipcRenderer.on('updater:update-downloaded', async (info) => {
  logger.info("Update downloaded", info)

  await ipcRenderer.invoke('app:quit-and-install')
});