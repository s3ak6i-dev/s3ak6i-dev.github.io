// One-off inspection script: dumps content type field IDs + locale so we can
// write correct entry payloads. Run with: node --env-file=.env scripts/contentful-inspect.mjs
import { createClient } from 'contentful-management';

const client = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN });

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = 'master';

const locales = await client.locale.getMany({ spaceId, environmentId });
console.log('Locales:', locales.items.map((l) => `${l.code}${l.default ? ' (default)' : ''}`));

for (const contentTypeId of ['blogPost', 'note']) {
  const ct = await client.contentType.get({ spaceId, environmentId, contentTypeId });
  console.log(`\n--- ${contentTypeId} ---`);
  for (const f of ct.fields) {
    console.log(`${f.id} (${f.type}${f.linkType ? `:${f.linkType}` : ''})${f.required ? ' [required]' : ''}`);
  }
}
