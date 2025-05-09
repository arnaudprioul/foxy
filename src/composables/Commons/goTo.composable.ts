import { useRtl } from "@foxy/composables"
import { FOXY_GO_TO_KEY } from "@foxy/consts"

import type { IGoToInstance, IGoToOptions, ILocaleInstance, IRtlInstance } from "@foxy/interfaces"

import { genDefaults, mergeDeep, scrollTo } from "@foxy/utils"

import { ComponentPublicInstance, computed, inject } from "vue"

export function createGoTo (
    options: IGoToOptions | undefined,
    locale: ILocaleInstance & IRtlInstance
): IGoToInstance {
    return {
        rtl: locale.isRtl,
        options: mergeDeep(genDefaults(), options as unknown as Record<string, unknown>) as unknown as IGoToOptions
    }
}

export function useGoTo (_options: Partial<IGoToOptions> = {}) {
    const goToInstance = inject(FOXY_GO_TO_KEY)

    const {isRtl} = useRtl()

    if (!goToInstance) throw new Error('[Foxy] Could not find injected goto instance')

    const goTo = {
        ...goToInstance,
        rtl: computed(() => goToInstance.rtl.value || isRtl.value)
    }

    async function go (
        target: ComponentPublicInstance | HTMLElement | string | number,
        options?: Partial<IGoToOptions>
    ) {
        return scrollTo(target, mergeDeep(_options, options), false, goTo)
    }

    go.horizontal = async (
        target: ComponentPublicInstance | HTMLElement | string | number,
        options?: Partial<IGoToOptions>
    ) => {
        return scrollTo(target, mergeDeep(_options, options), true, goTo)
    }

    return go
}
