/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-09-01 21:54:02.

export interface BaseData {
    type: string;
    requestId: string;
    secret: string;
}

export interface AcceptedFriendData extends BaseData {
    friendName: string;
    friendData: any;
}

export interface AddFriendData extends BaseData {
    target: string;
}

export interface AddFriendDataReply extends BaseData {
    status: boolean;
    message: string;
    hash: string;
}

export interface BlockFriendData extends BaseData {
    hash: string;
}

export interface FriendData extends BaseData {
    profile: Profile;
}

export interface GetFriendsData extends BaseData {
}

export interface GetFriendsDataReply extends BaseData {
    online: Profile[];
    offline: Profile[];
    pending: Profile[];
}

export interface OnlineFriendData extends FriendData {
}

export interface RequestFriendData extends BaseData {
    friendName: string;
    friendData: any;
}

export interface BrowseInstanceData extends BaseData {
    uuid: string;
    folder: string;
}

export interface BrowseInstanceDataReply extends BaseData {
    status: string;
}

export interface CancelInstallInstanceData extends BaseData {
    uuid: string;
}

export interface CancelInstallInstanceDataReply extends BaseData {
    status: string;
    message: string;
    uuid: string;
}

export interface CheckCurseZipData extends BaseData {
    path: string;
}

export interface CheckCurseZipDataReply extends CheckCurseZipData {
    success: boolean;
    message: string;
}

export interface CheckShareCodeData extends BaseData {
    shareCode: string;
}

export interface CheckShareCodeDataReply extends CheckShareCodeData {
    success: boolean;
}

export interface CloudSavesReloadedData extends BaseData {
    newInstances: InstanceJson[];
    removedInstances: string[];
}

export interface InstallInstanceData extends BaseData {
    uuid: string;
    id: number;
    version: number;
    _private: boolean;
    packType: number;
    shareCode: string;
    importFrom: string;
    name: string;
}

export interface FilesEvent extends BaseData {
    files: { [index: string]: string };
}

export interface InstallInstanceDataProgress extends BaseData {
    overallPercentage: number;
    speed: number;
    currentBytes: number;
    overallBytes: number;
    currentStage: InstallStage;
}

export interface InstallInstanceDataReply extends BaseData {
    status: string;
    message: string;
    uuid: string;
    instanceData: InstanceJson;
}

export interface InstalledInstancesData extends BaseData {
    refresh: boolean;
}

export interface InstalledInstancesDataReply extends BaseData {
    instances: InstanceJson[];
    cloudInstances: any[];
}

export interface InstanceCloudSyncConflictData extends BaseData {
    uuid: string;
    code: string;
    message: string;
}

export interface InstanceCloudSyncResolveConflictData extends BaseData {
    uuid: string;
    resolution: SyncDirection;
}

export interface InstanceCloudSyncResolveConflictDataReply extends BaseData {
    status: string;
    message: string;
}

export interface InstanceConfigureData extends BaseData {
    uuid: string;
    instanceInfo: { [index: string]: string };
}

export interface InstanceConfigureDataReply extends BaseData {
    errorMessage: string;
    uuid: string;
    status: string;
}

export interface InstanceInstallModData extends BaseData {
    uuid: string;
    modId: number;
    versionId: number;
}

export interface InstanceInstallModDataProgress extends BaseData {
    overallPercentage: number;
    speed: number;
    currentBytes: number;
    overallBytes: number;
}

export interface InstanceInstallModDataReply extends BaseData {
    status: string;
    message: string;
    dependencyList: Version[];
}

export interface InstanceModToggleData extends BaseData {
    uuid: string;
    state: boolean;
    fileName: string;
}

export interface InstanceModToggleDataReply extends InstanceModToggleData {
    successful: boolean;
}

export interface InstanceModsData extends BaseData {
    uuid: string;
    _private: boolean;
}

export interface InstanceModsDataReply extends InstanceModsData {
    files: ModFile[];
}

export interface InstanceVersionInfoData extends BaseData {
    uuid: string;
}

export interface InstanceVersionInfoDataReply extends BaseData {
    status: string;
    message: string;
    versionManifest: ModpackVersionManifest;
}

export interface KillInstanceData extends BaseData {
    uuid: string;
}

export interface KillInstanceDataReply extends BaseData {
    status: string;
    message: string;
}

export interface LaunchInstanceData extends BaseData {
    uuid: string;
    extraArgs: string;
    cancelLaunch: boolean;
    offline: boolean;
    offlineUsername: string;
}

export interface Logs extends BaseData {
    uuid: string;
    messages: string[];
}

export interface LaunchInstanceDataReply extends BaseData {
    status: string;
    message: string;
}

export interface Status extends BaseData {
    step: number;
    totalSteps: number;
    stepProgress: number;
    stepDesc: string;
    stepProgressHuman: string;
}

export interface Stopped extends BaseData {
    instanceId: string;
    status: string;
    exitCode: number;
}

export interface MessageClientData extends BaseData {
    uuid: string;
    message: string;
}

export interface OperationProgressUpdateData extends BaseData {
    operation: string;
    metadata: { [index: string]: string };
    stage: Stage;
    steps: number;
    totalSteps: number;
    percent: number;
    speed: number;
    bytes: number;
    totalBytes: number;
}

export interface PollCloudInstancesData extends BaseData {
}

export interface PollCloudInstancesDataReply extends BaseData {
    status: string;
    message: string;
}

export interface SetInstanceArtData extends BaseData {
    uuid: string;
    artPath: string;
}

export interface SetInstanceArtDataReply extends BaseData {
    status: string;
    message: string;
}

export interface ShareInstanceData extends BaseData {
    uuid: string;
}

export interface ShareInstanceDataReply extends BaseData {
    status: string;
    message: string;
    uuid: string;
    code: string;
}

export interface SyncCloudInstanceData extends BaseData {
    uuid: string;
}

export interface SyncCloudInstanceDataReply extends BaseData {
    status: string;
    message: string;
}

export interface UninstallInstanceData extends BaseData {
    uuid: string;
}

export interface UninstallInstanceDataReply extends BaseData {
    status: string;
    message: string;
}

export interface UpdateInstanceData extends InstallInstanceData {
}

export interface IRCConnectData extends BaseData {
    host: string;
    port: number;
    nick: string;
    realname: string;
}

export interface IRCEventMessageData extends BaseData {
    target: string;
    message: string;
    nick: string;
}

export interface IRCPartyInviteData extends FriendData {
}

export interface IRCQuitRequestData extends BaseData {
}

export interface IRCSendMessageData extends BaseData {
    nick: string;
    message: string;
}

export interface ClientLaunchData extends BaseData {
}

export interface ClientLaunchDataReply extends BaseData {
    messageType: string;
    message: string;
    instance: string;
    clientData: any;
}

export interface CloseModalData extends BaseData {
}

export interface FileHashData extends BaseData {
    uuid: string;
    filePath: string;
}

export interface FileHashDataReply extends BaseData {
    md5Hash: string;
    shaHash: string;
}

export interface GetJavasData extends BaseData {
}

export interface JavaInstall {
    name: string;
    path: string;
}

export interface GetJavasDataReply extends BaseData {
    javas: JavaInstall[];
}

export interface OpenModalData extends BaseData {
    title: string;
    message: string;
    dismissable: boolean;
    buttons: ModalButton[];
    id: string;
}

export interface ModalButton {
    message: string;
    name: string;
    colour: string;
}

export interface ModalCallbackData extends BaseData {
    id: string;
    message: string;
}

export interface PingLauncherData extends BaseData {
}

export interface PongLauncherData extends BaseData {
}

export interface SettingsConfigureData extends BaseData {
    settingsInfo: { [index: string]: string };
}

export interface SettingsConfigureDataReply extends BaseData {
    status: string;
}

export interface SettingsInfoData extends BaseData {
}

export interface SettingsInfoDataReply extends SettingsInfoData {
    settingsInfo: { [index: string]: string };
    totalMemory: number;
    availableMemory: number;
    totalCores: number;
    autoResolution: Dimension;
    supportedResolutions: Dimension[];
}

export interface StoreAuthDetailsData extends BaseData {
    mpKey: string;
    mpSecret: string;
    mtHash: string;
    s3Key: string;
    s3Secret: string;
    s3Bucket: string;
    s3Host: string;
}

export interface UploadLogsData extends BaseData {
    uiVersion: string;
}

export interface UploadLogsDataReply extends BaseData {
    error: boolean;
    code: string;
}

export interface WebRequestData extends BaseData {
    url: string;
    method: string;
    headers: { [index: string]: string[] };
    body: Body;
}

export interface Body {
    contentType: string;
    bytes: any;
}

export interface WebRequestDataResponse extends BaseData {
    status: string;
    statusMessage: string;
    statusCode: number;
    statusLine: string;
    headers: { [index: string]: string[] };
    body: Body;
}

export interface YeetLauncherData extends BaseData {
}

export interface DuplicateInstanceHandlerReply extends DuplicateInstanceHandlerRequest {
    message: string;
    success: boolean;
}

export interface DuplicateInstanceHandlerRequest extends BaseData {
    uuid: string;
    newName: string;
}

export interface GetInstanceFoldersHandlerReply extends GetInstanceFoldersHandlerRequest {
    folders: string[];
    success: boolean;
}

export interface GetInstanceFoldersHandlerRequest extends BaseData {
    uuid: string;
}

export interface InstanceDeleteBackupHandlerReply extends InstanceDeleteBackupHandlerRequest {
    message: string;
    success: boolean;
}

export interface InstanceDeleteBackupHandlerRequest extends BaseData {
    backupLocation: string;
}

export interface InstanceGetBackupsHandlerReply extends InstanceGetBackupsHandlerRequest {
    backups: Backup[];
}

export interface InstanceGetBackupsHandlerRequest extends BaseData {
    uuid: string;
}

export interface InstanceRestoreBackupHandlerReply extends InstanceRestoreBackupHandlerRequest {
    message: string;
    success: boolean;
}

export interface InstanceRestoreBackupHandlerRequest extends BaseData {
    uuid: string;
    backupLocation: string;
}

export interface AccountIsValidHandlerData extends BaseData {
    profileUuid: string;
}

export interface AccountIsValidHandlerReply extends AccountIsValidHandlerData {
    success: boolean;
    response: string;
}

export interface AuthenticateMcProfileHandlerData extends BaseData {
    username: string;
    password: string;
}

export interface AuthenticateMcProfileHandlerReply extends AuthenticateMcProfileHandlerData {
    success: boolean;
    response: string;
}

export interface AuthenticateMsProfileHandlerData extends BaseData {
    liveAccessToken: string;
    liveRefreshToken: string;
    liveExpires: number;
}

export interface AuthenticateMsProfileHandlerReply extends AuthenticateMsProfileHandlerData {
    success: boolean;
    networkError: boolean;
    code: string;
}

export interface GetProfilesHandlerReply extends BaseData {
    profiles: AccountProfile[];
    activeProfile: AccountProfile;
}

export interface RefreshAuthenticationProfileHandlerData extends BaseData {
    profileUuid: string;
    liveAccessToken: string;
    liveRefreshToken: string;
    liveExpires: number;
}

export interface RefreshAuthenticationProfileHandlerReply extends RefreshAuthenticationProfileHandlerData {
    networkError: boolean;
    success: boolean;
    code: string;
}

export interface RemoveProfileHandlerData extends BaseData {
    uuid: string;
}

export interface RemoveProfileHandlerReply extends RemoveProfileHandlerData {
    success: boolean;
}

export interface SetActiveProfileHandlerData extends BaseData {
    uuid: string;
}

export interface SetActiveProfileHandlerReply extends BaseData {
    success: boolean;
}

export interface StorageGetAllHandlerReply extends BaseData {
    response: string;
}

export interface StorageGetHandlerData extends BaseData {
    key: string;
}

export interface StorageGetHandlerReply extends StorageGetHandlerData {
    response: string;
}

export interface StoragePutHandlerData extends BaseData {
    key: string;
    value: string;
}

export interface StoragePutHandlerReply extends StoragePutHandlerData {
    success: boolean;
}

export interface Profile {
    longHash: string;
    shortHash: string;
    mediumHash: string;
    online: boolean;
    display: string;
    premium: boolean;
    userDisplay: string;
    friend: boolean;
    lastFriendCheck: number;
    friendName: string;
    friendCode: string;
    banned: boolean;
    packID: string;
    lastOnlineCheck: number;
    isOnline: boolean;
    isLoadingProfile: boolean;
    profileAge: number;
    hasAccount: boolean;
    muted: boolean;
    isPartyMember: boolean;
    pending: boolean;
}

export interface InstanceJson {
    uuid: string;
    id: number;
    versionId: number;
    name: string;
    version: string;
    mcVersion: string;
    /**
     * @deprecated
     */
    minMemory: number;
    /**
     * @deprecated
     */
    recMemory: number;
    memory: number;
    jvmArgs: string;
    embeddedJre: boolean;
    jrePath: string;
    width: number;
    height: number;
    modLoader: string;
    isModified: boolean;
    isImport: boolean;
    cloudSaves: boolean;
    hasInstMods: boolean;
    installComplete: boolean;
    packType: number;
    _private: boolean;
    totalPlayTime: number;
    lastPlayed: number;
    /**
     * @deprecated
     */
    art: string;
}

export interface ModpackVersionManifest {
    status: string;
    message: string;
    id: number;
    parent: number;
    name: string;
    specs: Specs;
    type: string;
    targets: Target[];
    files: ModpackFile[];
    installs: number;
    plays: number;
    updated: number;
    refreshed: number;
}

export interface Stage {
}

export interface Dimension {
    width: number;
    height: number;
}

export interface AccountProfile {
    isMicrosoft: boolean;
    uuid: string;
    lastLogin: number;
    username: string;
    msAuth: MSAuthStore;
    mcAuth: YggdrasilAuthStore;
    skins: AccountSkin[];
}

export interface Version {
    version: string;
    path: string;
    name: string;
    url: string;
    sha1: string;
    updated: string;
    size: number;
    clientOnly: boolean;
    id: number;
    type: string;
    targets: LoaderTarget[];
    dependencies: Dependency[];
}

export interface ModFile {
    name: string;
    version: string;
    size: number;
    sha1: string;
    expected: boolean;
    exists: boolean;
    enabled: boolean;
    realPath: string;
    curseProject: number;
    curseFile: number;
}

export interface Specs {
    id: number;
    minimum: number;
    recommended: number;
}

export interface Backup {
    worldName: string;
    createTime: number;
    backupLocation: string;
    size: number;
    ratio: number;
    sha1: string;
    preview: string;
    snapshot: boolean;
}

export interface MSAuthStore {
    minecraftUuid: string;
    minecraftToken: string;
    xblUserHash: string;
    liveAccessToken: string;
    liveRefreshToken: string;
    liveExpiresAt: number;
}

export interface YggdrasilAuthStore {
    clientToken: string;
    accessToken: string;
}

export interface Target {
    id: number;
    version: string;
    name: string;
    type: string;
    updated: number;
}

export interface ModpackFile {
    id: number;
    version: string;
    path: string;
    name: string;
    url: string;
    mirror: string[];
    sha1: any;
    size: number;
    clientonly: boolean;
    serveronly: boolean;
    optional: boolean;
    type: string;
    tags: any;
    updated: number;
}

export interface AccountSkin {
    id: string;
    state: string;
    url: string;
    variant: string;
    alias: string;
}

export interface LoaderTarget {
    name: string;
    id: number;
    type: string;
    version: string;
}

export interface Dependency {
    id: number;
    required: boolean;
}

export type InstallStage = "INIT" | "PREPARE" | "MODLOADER" | "DOWNLOADS" | "FINISHED";

export type SyncDirection = "UP_TO_DATE" | "DOWNLOAD" | "UPLOAD";
