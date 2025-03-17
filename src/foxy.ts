import * as foxyComponents from '@foxy/components'

import { createDate, createDisplay, createGoTo, createIcons, createLocale } from '@foxy/composables'

import {
    FOXY_DATE_ADAPTER_KEY,
    FOXY_DATE_OPTIONS_KEY,
    FOXY_DISPLAY_KEY,
    FOXY_GO_TO_KEY,
    FOXY_ICONS_KEY,
    FOXY_LOCALE_KEY
} from '@foxy/consts'

import * as foxyDirectives from '@foxy/directives'

import { IFoxyOptions } from '@foxy/interfaces'

import { getUid, mergeDeep } from '@foxy/utils'

import '@mdi/font/css/materialdesignicons.css'

import { App, defineComponent } from 'vue'

export function createFoxy (foxy: IFoxyOptions = {}) {
    const {blueprint, ...rest} = foxy
    const options: IFoxyOptions = mergeDeep(blueprint, rest)
    const {
        aliases = {},
        components = foxyComponents,
        directives = foxyDirectives
    } = options

    const icons = createIcons(options.icons)
    const display = createDisplay(options.display, options.ssr)
    const locale = createLocale(options.locale)
    const date = createDate(options.date, locale)
    const goTo = createGoTo(options.goTo, locale)

    const install = (app: App) => {
        for (const key in directives) {
            app.directive(key, directives[key as keyof typeof directives])
        }

        for (const key in components) {
            app.component(key, components[key as keyof typeof components])
        }

        for (const key in aliases) {
            app.component(key, defineComponent({
                ...aliases[key],
                name: key,
                aliasName: aliases[key].name
            }))
        }

        app.provide(FOXY_ICONS_KEY, icons)
        app.provide(FOXY_DISPLAY_KEY, display)
        app.provide(FOXY_LOCALE_KEY, locale)
        app.provide(FOXY_DATE_OPTIONS_KEY, date.options)
        app.provide(FOXY_DATE_ADAPTER_KEY, date.instance)
        app.provide(FOXY_GO_TO_KEY, goTo)

        getUid.reset()
    }

    return {
        install,
        icons
    }
}
