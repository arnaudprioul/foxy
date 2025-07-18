import markdownItCodetabs from 'markdown-it-codetabs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItFootnote from 'markdown-it-footnote'

import Components from 'unplugin-vue-components/vite'
import { Highlighter } from 'shiki'

import { defineConfig } from 'vitepress'

import {version} from '../../package.json'

const VERSIONS = [
    {text: `v${version} (current)`, link: '/'},
    {text: `Release Notes`, link: '/'},
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
    appearance: undefined,

    title: "Foxy",
    description: "Foxy is a site builder and design system developed in VueJs 3, composition api and typescript",

    vite: {
        plugins: [
            // @ts-expect-error v4-beta
            Components({
                include: [/\.vue/, /\.md/],
                dirs: '.vitepress/components',
                dts: '.vitepress/components.d.ts'
            }) as Plugin,
        ]
    },

    markdown: {
        config (md) {
            md.use(markdownItCodetabs)
            md.use(markdownItDeflist)
            md.use(markdownItFootnote)
        },
        theme: 'github-dark',
        defaultHighlightLang: 'html',

        // @ts-expect-error TODO
        async shikiSetup(shiki: Highlighter) {
            await shiki.loadTheme('dark-plus')
            shiki.setTheme('dark-plus')
        }
    },

    themeConfig: {
       logo: '../public/logo.svg',

        search: {
           provider: 'local'
        },

        editLink: {
           pattern: 'https://github.com',
            text: 'Edit this page on Github'
        },

        nav: [
            {
                text: 'Help & feedback', link: '/help'
            },
            {
                text: `v${version}`,
                items: VERSIONS
            }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    {
                        text: 'About Foxy',
                        link: '/getting-started/about',
                    },
                    {
                        text: 'Architecture',
                        link: '/getting-started/architecture',
                    },
                    {
                        text: 'Start designing',
                        link: '/getting-started/start-designing',
                    }
                ]
            },
            {
                text: 'Installation',
                collapsed: true,
                items: [
                    {
                        text: 'Prerequisites',
                        link: '/installation/prerequisites',
                    },
                    {
                        text: 'Nuxt',
                        link: '/installation/nuxt',
                    }
                ]
            },
            {
                text: 'Guidelines',
                collapsed: true,
                items: [
                    {
                        text: 'Typography',
                        link: '/guide/typography',
                    }
                ]
            },
            {
                text: 'Design Tokens',
                collapsed: true,
                items: [

                ]
            },
            {
                text: 'Components',
                collapsed: true,
                items: [

                ]
            }
        ],

        footer: {

        }
    },

    // async transformHtml(code, id, context) {
    //     console.log(code)
    //     console.log(id)
    //     console.log(context)
    // },

    head: [
        ['link', { rel: 'icon', href: '../public/favicon.ico' }],
        ['link', { rel: 'icon', href: '../public/logo.svg', type: 'image/svg+xml' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap', crossorigin:'' }],
    ]
})
