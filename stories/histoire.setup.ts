import { createFoxui } from '@foxui/foxui'
import { defineSetupVue3 } from '@histoire/plugin-vue'

import FoxuiStoryLayout from '@stories/components/wrapper/FoxuiStoryLayout.vue'

import '@stories/assets/scss/codetabs.scss'

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
    app.use(createFoxui())
    addWrapper(FoxuiStoryLayout)
})
