import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    content: group({
      title: 'Content',
      description: 'Content for pages',
      fields: {
        type: field({
          type: 'string',
          title: 'Page Type',
          description: 'Determines which layout to use (home / about)',
          options: ['home', 'about'],
        }),

        // ---------- HOME PAGE ----------
        home_section: group({
          title: '🏠 Home Page',
          description: 'Fields for Home page only',
          ui: {
            condition: (data: any) => data.type === 'home'
          },
          fields: {
            hero: field({ type: 'string', title: 'Hero Text' }),
            heroImage: group({
              title: 'Hero Image',
              fields: {
                src: field({ type: 'string', title: 'Image Source' }),
                alt: field({ type: 'string', title: 'Alt Text' })
              }
            }),

            lists: group({
              title: 'Lists',
              fields: {
                list_studio: field({ type: 'string', title: 'Studio' }),
                list_news: field({ type: 'string', title: 'News' }),
                list_sport: field({ type: 'string', title: 'Sport' }),
                list_code: field({ type: 'string', title: 'Code' }),
                list_interaction: field({ type: 'string', title: 'Interaction' }),
                list_operations: field({ type: 'string', title: 'Operations' }),
                list_storytelling: field({ type: 'string', title: 'Storytelling' }),
                list_infographics: field({ type: 'string', title: 'Infographics' })
              }
            }),

            interview: group({
              title: 'Interview Section',
              fields: {
                interview_header: field({ type: 'string', title: 'Header' }),
                interview_body: field({ type: 'string', title: 'Body' }),
                interview_body_part_2: field({ type: 'string', title: 'Body (Part 2)' }),
                interview_source_text: field({ type: 'string', title: 'Source Text' }),
                interview_watch_text: field({ type: 'string', title: 'Watch Text' })
              }
            }),

            textblocks: group({
              title: 'Textblocks',
              fields: {
                textblock_live_header: field({ type: 'string', title: 'Live Header' }),
                textblock_live_body: field({ type: 'string', title: 'Live Body' }),

                textblock_anspruch_header: field({ type: 'string', title: 'Commitment Header' }),
                textblock_anspruch_body: field({ type: 'string', title: 'Commitment Body' }),
                textblock_anspruch_button: field({ type: 'string', title: 'Commitment Button' }),
                textblock_anspruch_button_soon: field({ type: 'string', title: 'Commitment Button (Soon)' }),

                textblock_marken_header: field({ type: 'string', title: 'Brands Header' }),
                textblock_marken_body: field({ type: 'string', title: 'Brands Body' }),
                textblock_marken_button: field({ type: 'string', title: 'Brands Button' }),

                textblock_leistungen_header: field({ type: 'string', title: 'Services Header' }),
                textblock_leistungen_body: field({ type: 'string', title: 'Services Body' })
              }
            }),

            contact: group({
              title: 'Contact Section',
              fields: {
                contact_header: field({ type: 'string', title: 'Header' }),
                contact_button: field({ type: 'string', title: 'Button Text' }),
                contact_button_copied: field({ type: 'string', title: 'Copied Text' })
              }
            })
          }
        }),

        // ---------- ABOUT PAGE ----------
        about_section: group({
          title: 'ℹ️ About Page',
          description: 'Fields for About page only',
          ui: {
            condition: (data: any) => data.type === 'about'
          },
          fields: {
            header: field({ type: 'string', title: 'Header' }),
            subtTitle: field({ type: 'string', title: 'Subtitle' }),
            heroImage: group({
              title: 'Hero Image',
              fields: {
                src: field({ type: 'string', title: 'Image Source' }),
                alt: field({ type: 'string', title: 'Alt Text' })
              }
            }),

            addressBerlin: group({
              title: 'Address — Berlin',
              fields: {
                company: field({ type: 'string', title: 'Company' }),
                street: field({ type: 'string', title: 'Street' }),
                zip: field({ type: 'string', title: 'ZIP' }),
                phone: field({ type: 'string', title: 'Phone' }),
                fax: field({ type: 'string', title: 'Fax' })
              }
            }),

            addressZDF: group({
              title: 'Address — ZDF',
              fields: {
                company: field({ type: 'string', title: 'Company' }),
                street: field({ type: 'string', title: 'Street' }),
                zip: field({ type: 'string', title: 'ZIP' }),
                phone: field({ type: 'string', title: 'Phone' }),
                fax: field({ type: 'string', title: 'Fax' })
              }
            }),

            courtInfo: group({
              title: 'Court Info',
              fields: {
                text: field({ type: 'string', title: 'Court Name' }),
                hrb: field({ type: 'string', title: 'HRB Number' })
              }
            })
          }
        })
      }
    })
  }
})
