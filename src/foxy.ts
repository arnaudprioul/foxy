import * as foxyComponents from '@foxy/components'

import { createDate, createDisplay, createGoTo, createIcons, createLocale } from '@foxy/composables'

import {
    FOXY_DATE_ADAPTER_KEY,
    FOXY_DATE_OPTIONS_KEY,
    FOXY_DISPLAY_KEY,
    FOXY_GO_TO_KEY,
    FOXY_ICONS_KEY,
    FOXY_LOCALE_KEY,
    IN_BROWSER
} from '@foxy/consts'

import * as foxyDirectives from '@foxy/directives'

import { IFoxyOptions } from '@foxy/interfaces'
import { TIconOptions } from '@foxy/types'
import { getUid, mergeDeep } from '@foxy/utils'

import '@mdi/font/css/materialdesignicons.css'

import { App, ComponentPublicInstance, defineComponent, effectScope, InjectionKey, nextTick, reactive } from 'vue'

export function createFoxy (foxy: IFoxyOptions = {}) {
    const {blueprint, ...rest} = foxy
    const options: IFoxyOptions = mergeDeep(blueprint, rest)
    const {
        aliases = {},
        components = foxyComponents,
        directives = foxyDirectives
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

            app.provide(FOXY_ICONS_KEY, icons as Required<TIconOptions>)
            app.provide(FOXY_DISPLAY_KEY, display)
            app.provide(FOXY_LOCALE_KEY, locale)
            app.provide(FOXY_DATE_OPTIONS_KEY, date.options)
            app.provide(FOXY_DATE_ADAPTER_KEY, date.instance)
            app.provide(FOXY_GO_TO_KEY, goTo)

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
                        $foxy () {
                            return reactive({
                                display: inject.call(this as unknown as ComponentPublicInstance, FOXY_DISPLAY_KEY),
                                icons: inject.call(this as unknown as ComponentPublicInstance, FOXY_ICONS_KEY),
                                locale: inject.call(this as unknown as ComponentPublicInstance, FOXY_LOCALE_KEY),
                                date: inject.call(this as unknown as ComponentPublicInstance, FOXY_DATE_ADAPTER_KEY)
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
