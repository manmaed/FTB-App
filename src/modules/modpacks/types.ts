export interface ModPack {
  kind: 'modpack';
  synopsis: string;
  description: string;
  art: Art[];
  authors: Authors[];
  versions: Versions[];
  installs: number;
  plays: number;
  featured: boolean;
  refreshed: number;
  id: number;
  name: string;
  type: string;
  updated: number;
  released: number | 'unknown';
  tags: ModPackTag[];
  notification: string;
  links: ModPackLink[];
  private?: boolean;
}

export interface ModpackVersion {
  files: VersionFiles[];
  specs: VersionSpecs;
  targets: Targets[];
  installs: number;
  plays: number;
  refreshed: number;
  changelog: string;
  parent: number;
  notification: string;
  links: any[];
  status: string;
  id: number;
  name: string;
  type: string;
  updated: number;
  private: boolean;
}

export interface VersionFiles {
  version: string;
  path: string;
  url: string;
  mirrors: any[];
  sha1: string;
  size: number;
  tags: any[];
  clientonly: boolean;
  serveronly: boolean;
  optional: boolean;
  id: number;
  name: string;
  type: string;
  updated: number;
}

export interface Targets {
  version: string;
  id: number;
  name: string;
  type: string;
  updated: number;
}

export type PackProviders = "modpacksch" | "curseforge"

export interface ModPackLink {
  id: number;
  name: string;
  link: string;
  type: string;
}

export interface Instance {
  kind: string;
  id: number;
  uuid: string;
  name: string;
  versionId: number;
  version: string;
  art: string;
  path: string;
  authors: string[];
  lastPlayed: number;
  isImport: boolean;
  jvmArgs: string;
  jrePath: string;
  memory: number;
  minMemory: number;
  recMemory: number;
  width: number;
  height: number;
  notification: string;
  modpack: ModPack | undefined;
  cloudSaves: boolean;
  packType: number;
  modLoader: string;
  embeddedJre: boolean;
  totalPlayTime: number;
}

export interface Art {
  width: number;
  height: number;
  url: string;
  sha1: string;
  size: number;
  id: number;
  type: string;
  updated: number;
}

export interface Authors {
  website: string;
  id: number;
  name: string;
  type: string;
  updated: number;
}

export interface Versions {
  specs: VersionSpecs[];
  id: number;
  name: string;
  type: string;
  updated: number;
  mtgID?: string;
  private?: boolean;
  targets: Targets[]
}

export interface VersionSpecs {
  id: number;
  minimum: number;
  recommended: number;
}

export interface File {
  name: string;
  downloaded: boolean;
}

export interface ModPackTag {
  id: number;
  name: string;
}
