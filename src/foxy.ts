import * as foxuiComponents from '@foxui/components'

import { createDate, createDisplay, createGoTo, createIcons, createLocale } from '@foxui/composables'

import {
    FOXUI_DATE_ADAPTER_KEY,
    FOXUI_DATE_OPTIONS_KEY,
    FOXUI_DISPLAY_KEY,
    FOXUI_GO_TO_KEY,
    FOXUI_ICONS_KEY,
    FOXUI_LOCALE_KEY,
    IN_BROWSER
} from '@foxui/consts'

import * as foxuiDirectives from '@foxui/directives'

import type { IFoxuiOptions } from '@foxui/interfaces'
import type { TIconOptions } from '@foxui/types'
import { getUid, mergeDeep } from '@foxui/utils'

import '@mdi/font/css/materialdesignicons.css'

import { App, ComponentPublicInstance, defineComponent, effectScope, InjectionKey, nextTick, reactive } from 'vue'

export function createFoxui (foxui: IFoxuiOptions = {}) {
    const {blueprint, ...rest} = foxui
    const options: IFoxuiOptions = mergeDeep(blueprint, rest)
    const {
        aliases = {},
        components = foxuiComponents,
        directives = foxuiDirectives
    } = options

    const scope = effectScope()
    return scope.run(() => {
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


            const appScope = effectScope()
            app.onUnmount(() => appScope.stop())

            app.provide(FOXUI_ICONS_KEY, icons as Required<TIconOptions>)
            app.provide(FOXUI_DISPLAY_KEY, display)
            app.provide(FOXUI_LOCALE_KEY, locale)
            app.provide(FOXUI_DATE_OPTIONS_KEY, date.options)
            app.provide(FOXUI_DATE_ADAPTER_KEY, date.instance)
            app.provide(FOXUI_GO_TO_KEY, goTo)

            if (IN_BROWSER && options.ssr) {
                if (app.$nuxt) {
                    app.$nuxt.hook('app:suspense:resolve', () => {
                        display.update()
                    })
                } else {
                    const {mount} = app
                    app.mount = (...args) => {
                        const vm = mount(...args)
                        nextTick(() => display.update())
                        app.mount = mount
                        return vm
                    }
                }
            }

            getUid.reset()

            if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
                app.mixin({
                    computed: {
                        $foxui () {
                            return reactive({
                                display: inject.call(this as unknown as ComponentPublicInstance, FOXUI_DISPLAY_KEY),
                                icons: inject.call(this as unknown as ComponentPublicInstance, FOXUI_ICONS_KEY),
                                locale: inject.call(this as unknown as ComponentPublicInstance, FOXUI_LOCALE_KEY),
                                date: inject.call(this as unknown as ComponentPublicInstance, FOXUI_DATE_ADAPTER_KEY)
                            })
                        }
                    }
                })
            }
        }

        function unmount () {
            scope.stop()
        }

        return {
            install,
            unmount,
            display,
            icons,
            locale,
            date,
            goTo
        }
    })!
}

// Vue's inject() can only be used in setup
function inject (this: ComponentPublicInstance, key: InjectionKey<any> | string) {
    const vm = this.$

    const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides

    if (provides && (key as any) in provides) {
        return provides[(key as string)]
    }
}
