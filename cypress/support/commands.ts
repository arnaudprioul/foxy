import { mount } from "cypress/vue"
import { h } from "vue"

import { createFoxy } from "@foxy/foxy"
import { IFoxyOptions } from "@foxy/interfaces"
import { FoxyApp } from "@foxy/components"

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
