import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'page',
      source: 'content/about/*.md',
      schema: z.object({
        title: z.string(),
        heroImage: z.string(),
        description: z.string(),
        addressBerlin: z
          .object({
            company: z.string(),
            street: z.string(),
            zip: z.string(),
            phone: z.string(),
            fax: z.string(),
          })
          .optional(),
        addressZDF: z
          .object({
            company: z.string(),
            street: z.string(),
            zip: z.string(),
            phone: z.string(),
            fax: z.string(),
          })
          .optional(),
        courtInfo: z
          .object({
            text: z.string(),
            hrb: z.string(),
          })
          .optional(),
      }),
    }),
  },
})
