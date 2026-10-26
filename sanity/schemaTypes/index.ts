import type { SchemaTypeDefinition } from 'sanity';

import { conference } from './documents/conference';
import { grantGroup } from './documents/grant-group';
import { libraryItem } from './documents/library-item';
import { monograph } from './documents/monograph';
import { news } from './documents/news';
import { partner } from './documents/partner';
import { person } from './documents/person';
import { cover } from './objects/cover';
import { localeBlock, localeString, localeText } from './objects/locale';
import { seo } from './objects/seo';
import {
  aboutPage,
  conferencesPage,
  contactsPage,
  grantsPage,
  homePage,
  journalsPage,
  libraryPage,
  monographsPage,
  usefulInfoPage,
} from './singletons/pages';
import { siteSettings } from './singletons/site-settings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localeBlock,
  cover,
  seo,
  // collections
  conference,
  monograph,
  libraryItem,
  grantGroup,
  person,
  partner,
  news,
  // singletons
  siteSettings,
  homePage,
  aboutPage,
  conferencesPage,
  monographsPage,
  libraryPage,
  grantsPage,
  usefulInfoPage,
  journalsPage,
  contactsPage,
];
