import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

import markdownItCodetabs from 'markdown-it-codetabs'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItFootnote from 'markdown-it-footnote'

export default defineConfig({
    // your Histoire configuration
    setupFile: '/stories/histoire.setup.ts',
    outDir: 'dist/stories',
    plugins: [
        HstVue()
    ],
    theme: {
        title: 'Origam Page Builder',
        favicon: 'favicon.ico',
        logo: {
            square: './public/logo.svg',
            light: './public/logo.svg',
            dark: './public/logo.svg'
        }
    },
    defaultStoryProps: {
        icon: 'carbon:assembly-reference',
        iconColor: '#00c5a5',
        autoPropsDisabled: true
    },
    markdown: (md) => {
        md.use(markdownItCodetabs)
        md.use(markdownItDeflist)
        md.use(markdownItFootnote)
    },
    tree: {
        groups: [
            {
                id: 'top'
            },
            {
                id: 'stylesAndDesignTokens',
                title: 'Styles & Design token' // No toggle
            },
            {
                id: 'components',
                title: 'Components' // No toggle
            },
            {
                id: 'pageBuilder',
                title: 'Page Builder' // No toggle
            },
            {
                id: 'helpers',
                title: 'Helpers' // No toggle
            }
        ]
    }
})
