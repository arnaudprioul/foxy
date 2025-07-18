import { FoxyApp } from "@foxy/components"

import { createFoxy } from "@foxy/foxy"

import type { IFoxyOptions } from "@foxy/interfaces"
import { mount } from "cypress/vue"
import { h } from "vue"

const foxyOptions: IFoxyOptions = {}

Cypress.Commands.add('mount', (component, options = {}) => {
    options.global = options.global || {}
    options.global.plugins = options.global.plugins || []
    options.global.plugins.push({
        install(app) {
            app.use(createFoxy(foxyOptions))
        }
    })

    return mount(
        () => {
            return h(FoxyApp, {}, component)
        },
        options
    )
})
