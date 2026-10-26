import { defineQuery } from 'next-sanity';

// Text fields are `{ uk, en }`; until PER-10 adds a `$locale` param every
// query reads `.uk`. Images come back as URL + intrinsic size for next/image.

const COVER = `"imgSrc": cover.asset->url, "width": cover.asset->metadata.dimensions.width, "height": cover.asset->metadata.dimensions.height`;
const SEO = `"seo": seo{ "title": title.uk, "description": description.uk }`;

export const upcomingConferencesQuery = defineQuery(
  `*[_type == "conference" && date >= $today && defined(infoLetterUrl)] | order(date asc){ "id": _id, "title": title.uk, "description": subtitle.uk, date, "linkToDownload": infoLetterUrl, ${COVER} }`,
);

export const archivedConferencesQuery = defineQuery(
  `*[_type == "conference" && defined(proceedingsUrl)] | order(date desc){ "id": _id, "title": title.uk, "description": subtitle.uk, date, "linkToDownload": proceedingsUrl, ${COVER} }`,
);

export const upcomingMonographsQuery = defineQuery(
  `*[_type == "monograph" && date >= $today && defined(callUrl)] | order(date asc){ "id": _id, "title": title.uk, date, "linkToDownload": callUrl, ${COVER} }`,
);

export const archivedMonographsQuery = defineQuery(
  `*[_type == "monograph" && defined(bookUrl)] | order(date desc){ "id": _id, "title": title.uk, date, "linkToDownload": bookUrl, ${COVER} }`,
);

export const libraryQuery = defineQuery(
  `*[_type == "libraryItem"] | order(order asc){ "id": _id, "title": title.uk, "authors": authors.uk, kind, year, "linkToDownload": fileUrl, ${COVER} }`,
);

/** The 20 newest covers for the home hero mosaic. */
export const heroCoversQuery = defineQuery(
  `*[_type in ["conference", "monograph"] && defined(cover.asset)] | order(date desc)[0...20]{ "image": cover.asset->url, "width": cover.asset->metadata.dimensions.width, "height": cover.asset->metadata.dimensions.height }`,
);

export const partnersQuery = defineQuery(
  `*[_type == "partner"] | order(order asc){ "name": name.uk, href, "image": logo.asset->url, "width": logo.asset->metadata.dimensions.width, "height": logo.asset->metadata.dimensions.height }`,
);

export const newsQuery = defineQuery(
  `*[_type == "news"] | order(date desc, _id asc){ "id": _id, "text": text.uk, date, href, "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height }`,
);

export const grantGroupsQuery = defineQuery(
  `*[_type == "grantGroup"] | order(order asc){ "id": _id, "title": title.uk, "programs": programs[]{ "title": title.uk, "description": description.uk, "points": points[].uk, "deadline": deadline.uk, link } }`,
);

export const peopleQuery = defineQuery(
  `*[_type == "person" && $board in boards] | order(order asc){ "id": _id, "name": name.uk, "position": position.uk, profiles, "image": photo.asset->url, "width": photo.asset->metadata.dimensions.width, "height": photo.asset->metadata.dimensions.height }`,
);

export const siteSettingsQuery = defineQuery(
  `*[_id == "siteSettings"][0]{ "name": name.uk, contacts, "seo": seo{ "title": title.uk, "description": description.uk, keywords, "ogImage": ogImage.asset->url, "ogImageAlt": ogImage.alt.uk } }`,
);

export const homePageQuery = defineQuery(
  `*[_id == "homePage"][0]{ "hero": hero{ "overline": overline.uk, "heading": heading.uk, "text": text.uk }, "about": about{ "text": text.uk, "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "imgAlt": image.alt.uk } }`,
);

/** Title, lead and SEO of any page singleton (its _id is its type). */
export const pageQuery = defineQuery(
  `*[_id == $id][0]{ "title": title.uk, "lead": lead.uk, ${SEO} }`,
);

export const conferencesPageQuery = defineQuery(
  `*[_id == "conferencesPage"][0]{ "authorsForm": authorsForm{ "title": title.uk, "sub": sub.uk, "fields": fields[].uk } }`,
);

export const aboutPageQuery = defineQuery(
  `*[_id == "aboutPage"][0]{ "intro": intro.uk, "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "imgAlt": image.alt.uk, "statute": statute[]{ "title": title.uk, "linkToDownload": fileUrl }, "boardTitles": boardTitles{ "council": council.uk, "supervisory": supervisory.uk, "member": member.uk } }`,
);

export const usefulInfoPageQuery = defineQuery(
  `*[_id == "usefulInfoPage"][0]{ "table": table{ "caption": caption.uk, "rows": rows[]{ "group": group.uk, "type": type.uk, "example": example.uk }, "footnote": footnote.uk } }`,
);
