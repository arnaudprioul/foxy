import { FoxuiApp } from "@foxui/components"

import { createFoxui } from "@foxui/foxui"

import type { IFoxuiOptions } from "@foxui/interfaces"
import { mount } from "cypress/vue"
import { h } from "vue"

const foxuiOptions: IFoxuiOptions = {}

Cypress.Commands.add('mount', (component, options = {}) => {
    options.global = options.global || {}
    options.global.plugins = options.global.plugins || []
    options.global.plugins.push({
        install(app) {
            app.use(createFoxui(foxuiOptions))
        }
    })

    return mount(
        () => {
            return h(FoxuiApp, {}, component)
        },
        options
    )
})
