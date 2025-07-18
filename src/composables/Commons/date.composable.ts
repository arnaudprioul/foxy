import { useLocale } from "@foxy/composables"

import { FOXY_DATE_OPTIONS_KEY } from "@foxy/consts"

import type { IDateOptions, ILocaleInstance } from "@foxy/interfaces"

import { DateAdapter } from "@foxy/services"

import { createInstance, mergeDeep } from "@foxy/utils"
import { inject } from "vue"

export function createDate (options: IDateOptions | undefined, locale: ILocaleInstance) {
    const _options = mergeDeep({
        adapter: DateAdapter,
        locale: {
            af: 'af-ZA',
            // ar: '', # not the same value for all variants
            bg: 'bg-BG',
            ca: 'ca-ES',
            ckb: '',
            cs: 'cs-CZ',
            de: 'de-DE',
            el: 'el-GR',
            en: 'en-US',
            // es: '', # not the same value for all variants
            et: 'et-EE',
            fa: 'fa-IR',
            fi: 'fi-FI',
            // fr: '', #not the same value for all variants
            hr: 'hr-HR',
            hu: 'hu-HU',
            he: 'he-IL',
            id: 'id-ID',
            it: 'it-IT',
            ja: 'ja-JP',
            ko: 'ko-KR',
            lv: 'lv-LV',
            lt: 'lt-LT',
            nl: 'nl-NL',
            no: 'no-NO',
            pl: 'pl-PL',
            pt: 'pt-PT',
            ro: 'ro-RO',
            ru: 'ru-RU',
            sk: 'sk-SK',
            sl: 'sl-SI',
            srCyrl: 'sr-SP',
            srLatn: 'sr-SP',
            sv: 'sv-SE',
            th: 'th-TH',
            tr: 'tr-TR',
            az: 'az-AZ',
            uk: 'uk-UA',
            vi: 'vi-VN',
            zhHans: 'zh-CN',
            zhHant: 'zh-TW'
        }
    }, options as unknown as Record<string, unknown>) as unknown as IDateOptions

    return {
        options: _options,
        instance: createInstance(_options, locale)
    }
}

export function useDate () {
    const options = inject(FOXY_DATE_OPTIONS_KEY)

    if (!options) throw new Error('[Foxy] Could not find injected date options')

    const locale = useLocale()

    return createInstance(options, locale)
}
