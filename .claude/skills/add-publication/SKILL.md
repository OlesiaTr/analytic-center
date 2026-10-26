---
name: add-publication
description:
  Add a conference, monograph or library book to the site through Sanity. Use
  when asked to add, publish or update a publication (often with a PDF and a
  Google Drive link), e.g. "add this monograph", "new conference letter".
---

# Add a publication

Content lives in Sanity; never edit JSON or code to add one. Writes go to the
production dataset, so show the user the document and get a yes before
publishing.

## 1. Gather

From the PDF or the user:

- **Type:**
  - `conference`: info letter now, proceedings later
  - `monograph`: call booklet now, the book later
  - `libraryItem`: a textbook, study guide or monograph in the library
- **Title** (`title.uk`), keeping the quotes the center uses (“…”). Conferences
  also take a **subtitle**, the theme in quotes.
- **Date** as yyyy-mm-dd; library items take a **year** instead.
- **Library only:**
  - `kind`: `textbook`, `studyGuide` or `monograph`
  - `authors`: e.g. «О.М. Кузь, М.П. Требін та ін.»
- **Link:** a Google Drive file link becomes the direct download
  `https://docs.google.com/uc?export=download&id=<FILE_ID>`. Check that it
  answers with a file: `curl -sIL '<url>' | grep -i content-disposition`.
- **Cover:** the PDF's first page.
  - Render it with `pdftoppm -f 1 -l 1 -png -r 150 '<pdf>' <scratchpad>/cover`.
  - Upload the PNG as the cover image; Sanity's CDN handles size and format.
  - Leave its alt empty, because the title sits next to it.

## 2. Create

Either way, upload the cover and create the document in one confirmed step.

- **Sanity MCP** (`.mcp.json`, OAuth): create the document with the fields
  above.
- **Studio:** tell the user which fields to fill at `/studio`.

| Type          | Link field       | When it shows                           |
| ------------- | ---------------- | --------------------------------------- |
| `conference`  | `infoLetterUrl`  | upcoming while `date` is today or later |
| `conference`  | `proceedingsUrl` | the archive, once it exists             |
| `monograph`   | `callUrl`        | upcoming                                |
| `monograph`   | `bookUrl`        | the archive                             |
| `libraryItem` | `fileUrl`        | always; also set `order` (last + 1)     |

## 3. Check

- **Publishing:** it fires the webhook, so the page updates about 2 seconds
  later without a deploy.
- **Production:** open the page on acmhs.in.ua and check the card: cover, title,
  date and the download button. For a library item, also check the «authors ·
  kind» line.
- **Validation:** run `npx sanity documents validate --yes`. It should show 0
  errors.
