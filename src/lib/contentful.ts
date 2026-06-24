import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const client = createClient({
  space:       import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// ── types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  title:        string;
  slug:         string;
  description:  string;
  pubDate:      string;
  updatedDate?: string;
  heroImage?:   string;
  bodyHtml:     string;
}

export interface Project {
  name:         string;
  slug:         string;
  description:  string;
  year:         number;
  status:       'active' | 'completed' | 'archived';
  stack:        string[];
  image?:       string;
  github?:      string;
  demo?:        string;
  bodyHtml?:    string;
}

export interface Now {
  updatedDate: string;
  bodyHtml:    string;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function assetUrl(asset: any): string | undefined {
  const url = asset?.fields?.file?.url;
  return url ? `https:${url}` : undefined;
}

function toHtml(doc: any): string {
  return doc ? documentToHtmlString(doc) : '';
}

// ── fetchers ─────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await client.getEntries({
    content_type: 'blogPost',
    order:        ['-fields.pubDate' as any],
  });
  return res.items.map((item: any) => {
    const f = item.fields;
    return {
      title:       f.title,
      slug:        f.slug,
      description: f.description,
      pubDate:     f.pubDate,
      updatedDate: f.updatedDate,
      heroImage:   assetUrl(f.heroImage),
      bodyHtml:    toHtml(f.body),
    };
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await client.getEntries({
    content_type:  'blogPost',
    'fields.slug': slug,
    limit:         1,
  } as any);
  if (!res.items.length) return null;
  const f = (res.items[0] as any).fields;
  return {
    title:       f.title,
    slug:        f.slug,
    description: f.description,
    pubDate:     f.pubDate,
    updatedDate: f.updatedDate,
    heroImage:   assetUrl(f.heroImage),
    bodyHtml:    toHtml(f.body),
  };
}

export async function getProjects(): Promise<Project[]> {
  const res = await client.getEntries({
    content_type: 'project',
    order:        ['-fields.year' as any],
    include:      2,
  } as any);
  return res.items.map((item: any) => {
    const f = item.fields;
    const html = toHtml(f.body);
    return {
      name:        f.name,
      slug:        f.slug,
      description: f.description,
      year:        f.year,
      status:      f.status ?? 'completed',
      stack:       f.stack ?? [],
      image:       assetUrl(f.image),
      github:      f.github,
      demo:        f.demo,
      bodyHtml:    html || undefined,
    };
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  const res = await client.getEntries({
    content_type:  'project',
    'fields.slug': slug,
    limit:         1,
    include:       2,
  } as any);
  if (!res.items.length) return null;
  const f = (res.items[0] as any).fields;
  return {
    name:        f.name,
    slug:        f.slug,
    description: f.description,
    year:        f.year,
    status:      f.status ?? 'completed',
    stack:       f.stack ?? [],
    image:       assetUrl(f.image),
    github:      f.github,
    demo:        f.demo,
    bodyHtml:    toHtml(f.body) || undefined,
  };
}

export async function getNow(): Promise<Now | null> {
  const res = await client.getEntries({
    content_type: 'now',
    limit:        1,
  } as any);
  if (!res.items.length) return null;
  const f = (res.items[0] as any).fields;
  return {
    updatedDate: f.updatedDate,
    bodyHtml:    toHtml(f.body),
  };
}
