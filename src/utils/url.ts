/** Hostname without «www.», for link labels such as «fulbright.org.ua». */
export const toHost = (url: string) =>
  new URL(url).hostname.replace(/^www\./, '');
