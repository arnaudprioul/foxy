import { OrigamApp } from "@origam/components"

import type { IOrigamOptions } from "@origam/interfaces"

import { createOrigam } from "@origam/origam"
import { mount } from "cypress/vue"
import { h } from "vue"

const origamOptions: IOrigamOptions = {}

Cypress.Commands.add('mount', (component, options = {}) => {
    options.global = options.global || {}
    options.global.plugins = options.global.plugins || []
    options.global.plugins.push({
        install(app) {
            app.use(createOrigam(origamOptions))
        }
    })

    return mount(
        () => {
            return h(OrigamApp, {}, component)
        },
        options
    )
})
