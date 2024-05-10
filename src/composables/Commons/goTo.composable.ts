import { FOXY_GO_TO_KEY } from "@foxy/consts"

import { IGoToOptions } from "@foxy/interfaces"

import { genDefaults, mergeDeep, scrollTo } from "@foxy/utils"

import { ComponentPublicInstance, inject } from "vue"

export function createGoTo (options: Partial<IGoToOptions> | undefined) {
    return {
        options: mergeDeep(genDefaults(), options),
    }
}

export function useGoTo (_options: Partial<IGoToOptions> = {}) {
    const goToInstance = inject(FOXY_GO_TO_KEY)

    if (!goToInstance) throw new Error('[Foxy] Could not find injected goto instance')

    const goTo = {
        ...goToInstance
    }

    async function go (
        target: ComponentPublicInstance | HTMLElement | string | number,
        options?: Partial<IGoToOptions>,
    ) {
        return scrollTo(target, mergeDeep(_options, options), false, goTo)
    }

    go.horizontal = async (
        target: ComponentPublicInstance | HTMLElement | string | number,
        options?: Partial<IGoToOptions>,
    ) => {
        return scrollTo(target, mergeDeep(_options, options), true, goTo)
    }

    return go
}
