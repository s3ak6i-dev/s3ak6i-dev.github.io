// Creates and publishes a Contentful entry from a local content definition.
// Run with: node --env-file=.env scripts/publish-entry.mjs <content-file.mjs>
// The content file must default-export { contentType, fields } where any
// markdown-bodied field is listed in `richTextFields`.
import { createClient } from 'contentful-management';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = 'master';
const locale = 'en-US';

const client = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN });

const contentFilePath = process.argv[2];
if (!contentFilePath) {
  console.error('Usage: node --env-file=.env scripts/publish-entry.mjs <content-file.mjs>');
  process.exit(1);
}

const { contentType, fields, richTextFields = [] } = (await import(new URL(contentFilePath, `file://${process.cwd()}/`))).default;

const localizedFields = {};
for (const [key, value] of Object.entries(fields)) {
  const resolved = richTextFields.includes(key) ? await richTextFromMarkdown(value) : value;
  localizedFields[key] = { [locale]: resolved };
}

const entry = await client.entry.create(
  { spaceId, environmentId, contentTypeId: contentType },
  { fields: localizedFields }
);

console.log(`Created draft ${contentType} entry: ${entry.sys.id} (slug: ${fields.slug})`);
console.log('Not published — review it in Contentful, then publish manually when ready.');
