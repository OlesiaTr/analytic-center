import { defineQuery } from 'next-sanity';

// Text fields are `{ uk, en }`. `$locale` picks the language; a missing English
// value falls back to Ukrainian, and `lang` says which one the item is in, so the
// page can mark Ukrainian fallbacks with lang="uk". Images come back as URL +
// intrinsic size for next/image.

/** The field in `$locale`, or Ukrainian when there is no English. */
const l = <const F extends string>(field: F) =>
  `select($locale == "en" => coalesce(${field}.en, ${field}.uk), ${field}.uk)` as const;

/** "en" when the item has English for `field`, otherwise "uk". */
const lang = <const F extends string>(field: F) =>
  `"lang": select($locale == "en" && defined(${field}.en) => "en", "uk")` as const;

const COVER = `"imgSrc": cover.asset->url, "width": cover.asset->metadata.dimensions.width, "height": cover.asset->metadata.dimensions.height`;
const SEO =
  `"seo": seo{ "title": ${l('title')}, "description": ${l('description')} }` as const;

export const upcomingConferencesQuery = defineQuery(
  `*[_type == "conference" && date >= $today && defined(infoLetterUrl)] | order(date asc){ "id": _id, "title": ${l('title')}, "description": ${l('subtitle')}, ${lang('title')}, date, "linkToDownload": infoLetterUrl, ${COVER} }`,
);

export const archivedConferencesQuery = defineQuery(
  `*[_type == "conference" && defined(proceedingsUrl)] | order(date desc){ "id": _id, "title": ${l('title')}, "description": ${l('subtitle')}, ${lang('title')}, date, "linkToDownload": proceedingsUrl, ${COVER} }`,
);

export const upcomingMonographsQuery = defineQuery(
  `*[_type == "monograph" && date >= $today && defined(callUrl)] | order(date asc){ "id": _id, "title": ${l('title')}, ${lang('title')}, date, "linkToDownload": callUrl, ${COVER} }`,
);

export const archivedMonographsQuery = defineQuery(
  `*[_type == "monograph" && defined(bookUrl)] | order(date desc){ "id": _id, "title": ${l('title')}, ${lang('title')}, date, "linkToDownload": bookUrl, ${COVER} }`,
);

export const libraryQuery = defineQuery(
  `*[_type == "libraryItem"] | order(order asc){ "id": _id, "title": ${l('title')}, "authors": ${l('authors')}, ${lang('title')}, kind, year, "linkToDownload": fileUrl, ${COVER} }`,
);

/** The 20 newest covers for the home hero mosaic. */
export const heroCoversQuery = defineQuery(
  `*[_type in ["conference", "monograph"] && defined(cover.asset)] | order(date desc)[0...20]{ "image": cover.asset->url, "width": cover.asset->metadata.dimensions.width, "height": cover.asset->metadata.dimensions.height }`,
);

export const partnersQuery = defineQuery(
  `*[_type == "partner"] | order(order asc){ "name": ${l('name')}, ${lang('name')}, href, "image": logo.asset->url, "width": logo.asset->metadata.dimensions.width, "height": logo.asset->metadata.dimensions.height }`,
);

export const newsQuery = defineQuery(
  `*[_type == "news"] | order(date desc, _id asc){ "id": _id, "text": ${l('text')}, ${lang('text')}, date, href, "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height }`,
);

export const grantGroupsQuery = defineQuery(
  `*[_type == "grantGroup"] | order(order asc){ "id": _id, "title": ${l('title')}, ${lang('title')}, "programs": programs[]{ "title": ${l('title')}, "description": ${l('description')}, ${lang('description')}, "points": points[]{ "text": ${l('@')} }, "deadline": ${l('deadline')}, link } }`,
);

export const peopleQuery = defineQuery(
  `*[_type == "person" && $board in boards] | order(order asc){ "id": _id, "name": ${l('name')}, "position": ${l('position')}, ${lang('position')}, profiles, "image": photo.asset->url, "width": photo.asset->metadata.dimensions.width, "height": photo.asset->metadata.dimensions.height }`,
);

export const siteSettingsQuery = defineQuery(
  `*[_id == "siteSettings"][0]{ "name": ${l('name')}, contacts, "seo": seo{ "title": ${l('title')}, "description": ${l('description')}, keywords, "ogImage": ogImage.asset->url, "ogImageAlt": ${l('ogImage.alt')} } }`,
);

export const homePageQuery = defineQuery(
  `*[_id == "homePage"][0]{ "hero": hero{ "overline": ${l('overline')}, "heading": ${l('heading')}, "text": ${l('text')}, ${lang('heading')} }, "about": about{ "text": ${l('text')}, ${lang('text')}, "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "imgAlt": ${l('image.alt')} } }`,
);

/** Title, lead and SEO of any page singleton (its _id is its type). */
export const pageQuery = defineQuery(
  `*[_id == $id][0]{ "title": ${l('title')}, "lead": ${l('lead')}, ${lang('title')}, ${SEO} }`,
);

export const conferencesPageQuery = defineQuery(
  `*[_id == "conferencesPage"][0]{ "authorsForm": authorsForm{ "title": ${l('title')}, "sub": ${l('sub')}, ${lang('title')}, "fields": fields[]{ "text": ${l('@')} } } }`,
);

export const aboutPageQuery = defineQuery(
  `*[_id == "aboutPage"][0]{ "intro": select($locale == "en" && count(intro.en) > 0 => intro.en, intro.uk), "introLang": select($locale == "en" && count(intro.en) > 0 => "en", "uk"), "imgSrc": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "imgAlt": ${l('image.alt')}, "statute": statute[]{ "title": ${l('title')}, "linkToDownload": fileUrl }, "boardTitles": boardTitles{ "council": ${l('council')}, "supervisory": ${l('supervisory')}, "member": ${l('member')} } }`,
);

export const usefulInfoPageQuery = defineQuery(
  `*[_id == "usefulInfoPage"][0]{ "table": table{ "caption": ${l('caption')}, "rows": rows[]{ "group": ${l('group')}, "type": ${l('type')}, "example": ${l('example')}, "exampleLang": select($locale == "en" && defined(example.en) => "en", "uk") }, "footnote": ${l('footnote')} } }`,
);
