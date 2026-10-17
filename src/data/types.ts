// Shapes of the content JSON. Assigning JSON to these types (instead of `as`)
// makes TypeScript check the data, so a missing or misspelled field fails the build.

export interface Publication {
  id: string;
  imgSrc: string;
  width: number;
  height: number;
  imgAlt: string;
  title: string;
  date: string;
  linkToDownload: string;
}

export interface Conference extends Publication {
  description: string;
  day: string;
  month: string;
}

export interface UpcomingConferences {
  title: string;
  list: Conference[];
  button: string;
  buttonDownload: string;
  linkDownload: string;
  redirectionTo: string;
}
