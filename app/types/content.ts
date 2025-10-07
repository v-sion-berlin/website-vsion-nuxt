// types/content.ts

export interface Media {
  src: string
  alt: string
}

export interface HomePage {
  type: 'home'
  hero: string
  heroImage?: Media
  // Lists
  list_studio: string
  list_news: string
  list_sport: string
  list_code: string
  list_interaction: string
  list_operations: string
  list_storytelling: string
  list_infographics: string
  // Interview
  interview_header: string
  interview_body: string
  interview_body_part_2: string
  interview_source_text: string
  interview_watch_text: string
  // Textblocks
  textblock_live_header: string
  textblock_live_body: string
  textblock_anspruch_header: string
  textblock_anspruch_body: string
  textblock_anspruch_button: string
  textblock_anspruch_button_soon: string
  textblock_marken_header: string
  textblock_marken_body: string
  textblock_marken_button: string
  textblock_leistungen_header: string
  textblock_leistungen_body: string
  // Contact
  contact_header: string
  contact_button: string
  contact_button_copied: string
}

export interface Address {
  company: string
  street: string
  zip: string
  phone?: string
  fax?: string
}

export interface CourtInfo {
  text: string
  hrb: string
}

export interface AboutPage {
  type: 'about'
  header?: string
  subtTitle?: string
  heroImage?: Media
  addressBerlin?: Address
  addressZDF?: Address
  courtInfo?: CourtInfo
}
