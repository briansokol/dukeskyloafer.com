export interface ModListHeader {
  type: "header";
  label: string;
}

export interface ModListMod {
  type: "mod";
  name: string;
  url?: string;
}

export type ModListSection = [ModListHeader, ...ModListMod[]] | ModListMod[];
