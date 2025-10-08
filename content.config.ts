import { defineContentConfig, defineCollection, property } from '@nuxt/content'
import { z } from 'zod'

// --- Home Page ---
const homePageSchema = z.object({
  type: z.literal('home'),
  hero: z.string(),
  heroImage: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string()
  }).optional(),

  // Lists
  list_studio: z.string(),
  list_news: z.string(),
  list_sport: z.string(),
  list_code: z.string(),
  list_interaction: z.string(),
  list_operations: z.string(),
  list_storytelling: z.string(),
  list_infographics: z.string(),

  // Interview
  interview_header: z.string(),
  interview_body: z.string(),
  interview_body_part_2: z.string(),
  interview_source_text: z.string(),
  interview_watch_text: z.string(),

  // Textblocks
  textblock_live_header: z.string(),
  textblock_live_body: z.string(),
  textblock_anspruch_header: z.string(),
  textblock_anspruch_body: z.string(),
  textblock_anspruch_button: z.string(),
  textblock_anspruch_button_soon: z.string(),
  textblock_marken_header: z.string(),
  textblock_marken_body: z.string(),
  textblock_marken_button: z.string(),
  textblock_leistungen_header: z.string(),
  textblock_leistungen_body: z.string(),

  // Contact
  contact_header: z.string(),
  contact_button: z.string(),
  contact_button_copied: z.string(),
})

// --- About Page ---
const aboutPageSchema = z.object({
  type: z.literal('about'),
  header: z.string().optional(),
  subtTitle: z.string().optional(),
  heroImage: z.object({
    src: property(z.string()).editor({ input: 'media' }),
    alt: z.string()
  }).optional(),
  addressBerlin: z.object({
    company: z.string(),
    street: z.string(),
    zip: z.string(),
    phone: z.string(),
    fax: z.string(),
  }).optional(),
  addressZDF: z.object({
    company: z.string(),
    street: z.string(),
    zip: z.string(),
    phone: z.string(),
    fax: z.string(),
  }).optional(),
  courtInfo: z.object({
    text: z.string(),
    hrb: z.string(),
  }).optional(),
})


export default defineContentConfig({
  collections: {
    home_en: defineCollection({
      type: 'data',
      source: { include: 'en/index.md', prefix: '/' },
      schema: homePageSchema,
    }),
    about_en: defineCollection({
      type: 'data',
      source: { include: 'en/about.md', prefix: '/' },
      schema: aboutPageSchema,
    }),

    home_de: defineCollection({
      type: 'data',
      source: { include: 'de/index.md', prefix: '/' },
      schema: homePageSchema,
    }),
    about_de: defineCollection({
      type: 'data',
      source: { include: 'de/about.md', prefix: '/' },
      schema: aboutPageSchema,
    }),
  },
})
