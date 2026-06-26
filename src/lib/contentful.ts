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
  screenshots?: string[];
  github?:      string;
  demo?:        string;
  bodyHtml?:    string;
}

export interface Now {
  updatedDate: string;
  bodyHtml:    string;
}

export interface Note {
  title:       string;
  slug:        string;
  description: string;
  category:    string;
  pubDate:     string;
  source?:     string;
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
      image:       assetUrl(f.media) ?? assetUrl(f.image),
      screenshots: Array.isArray(f.screenshots)
        ? f.screenshots.map((a: any) => assetUrl(a)).filter(Boolean)
        : undefined,
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
    image:       assetUrl(f.media) ?? assetUrl(f.image),
    screenshots: Array.isArray(f.screenshots)
      ? f.screenshots.map((a: any) => assetUrl(a)).filter(Boolean)
      : undefined,
    github:      f.github,
    demo:        f.demo,
    bodyHtml:    toHtml(f.body) || undefined,
  };
}

export interface CaseStudy {
  title:         string;
  slug:          string;
  year:          number;
  summary:       string;
  product?:      string;
  technical?:    string;
  business?:     string;
  socialImpact?: string;
  stack?:        string[];
  github?:       string;
  demo?:         string;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await client.getEntries({
      content_type: 'caseStudy',
      order:        ['-fields.year' as any],
    });
    return res.items.map((item: any) => {
      const f = item.fields;
      return {
        title:        f.title,
        slug:         f.slug,
        year:         f.year,
        summary:      f.summary ?? '',
        product:      f.product      ? toHtml(f.product)      : undefined,
        technical:    f.technical    ? toHtml(f.technical)    : undefined,
        business:     f.business     ? toHtml(f.business)     : undefined,
        socialImpact: f.socialImpact ? toHtml(f.socialImpact) : undefined,
        stack:        f.stack ?? [],
        github:       f.github,
        demo:         f.demo,
      };
    });
  } catch {
    return [];
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const res = await client.getEntries({
      content_type:  'caseStudy',
      'fields.slug': slug,
      limit:         1,
    } as any);
    if (!res.items.length) return null;
    const f = (res.items[0] as any).fields;
    return {
      title:        f.title,
      slug:         f.slug,
      year:         f.year,
      summary:      f.summary ?? '',
      product:      f.product      ? toHtml(f.product)      : undefined,
      technical:    f.technical    ? toHtml(f.technical)    : undefined,
      business:     f.business     ? toHtml(f.business)     : undefined,
      socialImpact: f.socialImpact ? toHtml(f.socialImpact) : undefined,
      stack:        f.stack ?? [],
      github:       f.github,
      demo:         f.demo,
    };
  } catch {
    return null;
  }
}

export async function getNotes(): Promise<Note[]> {
  try {
    const res = await client.getEntries({
      content_type: 'note',
      order:        ['-fields.pubDate' as any],
    });
    return res.items.map((item: any) => {
      const f = item.fields;
      return {
        title:       f.title,
        slug:        f.slug,
        description: f.description ?? '',
        category:    f.category ?? 'note',
        pubDate:     f.pubDate,
        source:      f.source,
        bodyHtml:    toHtml(f.body),
      };
    });
  } catch {
    return [];
  }
}

export async function getNote(slug: string): Promise<Note | null> {
  try {
    const res = await client.getEntries({
      content_type:  'note',
      'fields.slug': slug,
      limit:         1,
    } as any);
    if (!res.items.length) return null;
    const f = (res.items[0] as any).fields;
    return {
      title:       f.title,
      slug:        f.slug,
      description: f.description ?? '',
      category:    f.category ?? 'note',
      pubDate:     f.pubDate,
      source:      f.source,
      bodyHtml:    toHtml(f.body),
    };
  } catch {
    return null;
  }
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
