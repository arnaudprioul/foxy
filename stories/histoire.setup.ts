import { defineSetupVue3 } from '@histoire/plugin-vue'

import FoxyStoryLayout from '@stories/components/wrapper/FoxyStoryLayout.vue'

import { createFoxy } from '@foxy/foxy'

import '@stories/assets/scss/codetabs.scss'

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
    app.use(createFoxy())
    addWrapper(FoxyStoryLayout)
})
