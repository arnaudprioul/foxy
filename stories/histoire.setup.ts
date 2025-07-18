import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createOrigam } from '@origam/origam'

import OrigamStoryLayout from '@stories/components/wrapper/OrigamStoryLayout.vue'

import '@stories/assets/scss/codetabs.scss'

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
    app.use(createOrigam())
    addWrapper(OrigamStoryLayout)
})
