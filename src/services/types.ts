export interface Legislator {
  position_title: string;
  firstName: string;
  lastName: string;
  party: string;
  link: string;
  fullName: string;
}

export interface Chamber {
  link: string;
  name: string;
}

export interface RollCallResults {
  yea: number;
  nay: string;
}

export interface RollCall {
  target: string;
  chamber: Chamber;
  rollcall_number: string;
  results: RollCallResults;
  link: string;
  type: string;
}

export interface Subject {
  entry: string;
  link: string;
}

export interface FiscalNote {
  name: string;
  link: string;
}

export interface Version {
  billName: string;
  printVersion: string;
  printVersionName: string;
  stage: string;
  stageVerbose: string;
  year: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  digest: string;
  created: string;
  updated: string;
  enrolled: string | null;
  introduced: string;
  filed: string;
  printed: string;
  authors: Legislator[];
  coauthors: Legislator[];
  sponsors: Legislator[];
  cosponsors: Legislator[];
  advisors: Legislator[];
  conferees: Legislator[];
  subjects: Subject[];
  link: string;
  'fiscal-notes': FiscalNote[];
  rollcalls: RollCall[];
}

export interface Bill {
  title: string;
  billName: string;
  number: string;
  description: string;
  status: string;
  stage: string;
  year: string;
  originChamber: string;
  currentChamber: string;
  type: string;
  latestVersion: Version;
  versions: Version[];
}