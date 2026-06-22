import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		year: z.number(),
		status: z.enum(['active', 'completed', 'archived']).default('completed'),
		stack: z.array(z.string()).default([]),
		image: z.string().optional(),
		github: z.string().url().optional(),
		demo: z.string().url().optional(),
	}),
});

const now = defineCollection({
	loader: glob({ base: './src/content/now', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		updatedDate: z.coerce.date(),
	}),
});

export const collections = { blog, projects, now };
