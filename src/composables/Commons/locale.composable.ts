import * as foxyMessages from "@foxy/assets/locales"

import { FOXY_LOCALE_KEY, LOCALE_RTL_DEFAULT } from "@foxy/consts"

import { ILocaleInstance, ILocaleOptions, ILocaleProps, IRtlInstance, IRtlOptions, IRtlProps } from "@foxy/interfaces"

import { createVueI18nAdapter, getCurrentInstanceName, mergeDeep } from "@foxy/utils"

import { computed, inject, provide, ref } from "vue"
import { createI18n, useI18n } from "vue-i18n"

export function createLocale (options?: ILocaleOptions & IRtlOptions) {
    const i18nOptions = mergeDeep({
        locale: 'en',
        fallbackLocale: 'en',
        messages: JSON.parse(JSON.stringify(foxyMessages)), // Fix problems with json file imported
        legacy: false
    }, options)
    const i18n = createI18n(i18nOptions)

    const locale = createVueI18nAdapter({i18n, useI18n})
    const rtl = createRtl(locale, options)

    return {...locale, ...rtl}
}

export function useLocale () {
    const locale = inject(FOXY_LOCALE_KEY)

    if (!locale) throw new Error('[Foxy] Could not find injected locale instance')

    return locale
}

export function provideLocale (props: ILocaleProps & IRtlProps) {
    const locale = inject(FOXY_LOCALE_KEY)

    if (!locale) throw new Error('[Foxy] Could not find injected locale instance')

    const i18n = locale.provide(props)
    const rtl = provideRtl(i18n, locale.rtl, props)

    const data = {...i18n, ...rtl}

    provide(FOXY_LOCALE_KEY, data)

    return data
}

export function createRtl (i18n: ILocaleInstance, options?: IRtlOptions): IRtlInstance {
    const rtl = ref<Record<string, boolean>>(options?.rtl ?? LOCALE_RTL_DEFAULT)
    const isRtl = computed(() => rtl.value[i18n.current.value] ?? false)

    return {
        isRtl,
        rtl
    }
}

export function useRtl (name = getCurrentInstanceName()) {
    const locale = inject(FOXY_LOCALE_KEY)

    if (!locale) throw new Error('[Foxy] Could not find injected rtl instance')

    const rtlClasses = computed(() => {
        return `${name}--is-${locale.isRtl.value ? 'rtl' : 'ltr'}`
    })

    return {isRtl: locale.isRtl, rtlClasses}
}

export function provideRtl (locale: ILocaleInstance, rtl: IRtlInstance['rtl'], props: IRtlProps): IRtlInstance {
    const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false)

    return {
        isRtl,
        rtl
    }
}

