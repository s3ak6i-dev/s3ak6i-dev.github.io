// Publishes an existing draft entry by ID.
// Run with: node --env-file=.env scripts/publish-draft.mjs <entryId>
import { createClient } from 'contentful-management';

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = 'master';

const client = createClient({ accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN });

const entryId = process.argv[2];
if (!entryId) {
  console.error('Usage: node --env-file=.env scripts/publish-draft.mjs <entryId>');
  process.exit(1);
}

const entry = await client.entry.get({ spaceId, environmentId, entryId });
const published = await client.entry.publish({ spaceId, environmentId, entryId }, entry);

console.log(`Published: ${published.fields.title['en-US']} (${entryId})`);
