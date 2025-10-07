import { defineDocumentType, defineNestedType } from '@nuxt/content/preview'

export const HeroImage = defineNestedType(() => ({
  name: 'HeroImage',
  fields: {
    src: { type: 'string', required: true },
    alt: { type: 'string', required: true }
  }
}))

export const Lists = defineNestedType(() => ({
  name: 'Lists',
  fields: {
    list_studio: { type: 'string' },
    list_news: { type: 'string' },
    list_sport: { type: 'string' },
    list_code: { type: 'string' },
    list_interaction: { type: 'string' },
    list_operations: { type: 'string' },
    list_storytelling: { type: 'string' },
    list_infographics: { type: 'string' }
  }
}))

export const Interview = defineNestedType(() => ({
  name: 'Interview',
  fields: {
    interview_header: { type: 'string' },
    interview_body: { type: 'text' },
    interview_body_part_2: { type: 'text' },
    interview_source_text: { type: 'string' },
    interview_watch_text: { type: 'string' }
  }
}))

export const Textblocks = defineNestedType(() => ({
  name: 'Textblocks',
  fields: {
    textblock_live_header: { type: 'string' },
    textblock_live_body: { type: 'text' },
    textblock_anspruch_header: { type: 'string' },
    textblock_anspruch_body: { type: 'text' },
    textblock_anspruch_button: { type: 'string' },
    textblock_anspruch_button_soon: { type: 'string' },
    textblock_marken_header: { type: 'string' },
    textblock_marken_body: { type: 'text' },
    textblock_marken_button: { type: 'string' },
    textblock_leistungen_header: { type: 'string' },
    textblock_leistungen_body: { type: 'text' }
  }
}))

export const Contact = defineNestedType(() => ({
  name: 'Contact',
  fields: {
    contact_header: { type: 'string' },
    contact_button: { type: 'string' },
    contact_button_copied: { type: 'string' }
  }
}))

export const Home = defineDocumentType(() => ({
  name: 'Home',
  filePathPattern: 'index.md',
  fields: {
    type: { type: 'string', required: true },
    hero: { type: 'string', required: true },
    heroImage: { type: 'HeroImage', required: true },
    lists: { type: 'Lists', required: true },
    interview: { type: 'Interview', required: true },
    textblocks: { type: 'Textblocks', required: true },
    contact: { type: 'Contact', required: true }
  }
}))

export const Address = defineNestedType(() => ({
  name: 'Address',
  fields: {
    company: { type: 'string' },
    street: { type: 'string' },
    zip: { type: 'string' },
    phone: { type: 'string' },
    fax: { type: 'string' }
  }
}))

export const CourtInfo = defineNestedType(() => ({
  name: 'CourtInfo',
  fields: {
    text: { type: 'string' },
    hrb: { type: 'string' }
  }
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'about.md',
  fields: {
    type: { type: 'string', required: true },
    header: { type: 'string', required: true },
    subtTitle: { type: 'string', required: true },
    heroImage: { type: 'HeroImage', required: true },
    addressBerlin: { type: 'Address', required: true },
    addressZDF: { type: 'Address', required: true },
    courtInfo: { type: 'CourtInfo', required: true }
  }
}))
