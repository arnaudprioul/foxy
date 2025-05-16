import { DEFAULT_DOCUMENT } from "@foxy/consts"
import type { IStyleTagOptions } from "@foxy/interfaces"
import { getCurrentInstanceName, getUid, tryOnMounted, tryOnScopeDispose } from "@foxy/utils"

import { computed, ComputedRef, MaybeRef, onMounted, readonly, shallowRef, watch } from 'vue'

let _id = 0

/**
 * Inject <style> element in head.
 *
 * Overload: Omitted id
 *
 * @param css
 * @param options
 */
export function useStyleTag (
    css: MaybeRef<string>,
    options: IStyleTagOptions = {}
) {
    const isLoaded = shallowRef(false)

    const {
        document = DEFAULT_DOCUMENT,
        immediate = true,
        manual = false,
        id = `foxy_styletag_${++_id}`
    } = options

    const cssRef = shallowRef(css)

    let stop = () => {
    }
    const load = () => {
        if (!document)
            return

        const el = (document.getElementById(id) || document.createElement('style')) as HTMLStyleElement

        if (!el.isConnected) {
            el.id = id
            if (options.media)
                el.media = options.media
            document.head.appendChild(el)
        }

        if (isLoaded.value)
            return

        stop = watch(
            cssRef,
            (value) => {
                el.textContent = value
            },
            {immediate: true}
        )

        isLoaded.value = true
    }

    const unload = () => {
        if (!document || !isLoaded.value)
            return
        stop()
        document.head.removeChild(document.getElementById(id) as HTMLStyleElement)
        isLoaded.value = false
    }

    if (immediate && !manual)
        tryOnMounted(load)

    if (!manual)
        tryOnScopeDispose(unload)

    return {
        id,
        css: cssRef,
        unload,
        load,
        isLoaded: readonly(isLoaded)
    }
}

export function useStyle (styles: ComputedRef, uniq = undefined, name = getCurrentInstanceName()) {
    const id = computed(() => {
        return uniq ?? `${name}-${getUid()}`
    })

    const customCss = computed(() => {
        const stylesArray = styles.value
            .map((value: any) => {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    return Object.keys(value)
                        .filter((key) => typeof value[key] !== 'undefined')
                        .map((key) => `${key}: ${value[key]}`)
                }

                return value
            })
            .flat()
            // @ts-expect-error
            .filter((value) => value.length > 0)

        return `#${id.value} {${stylesArray.join(';')}}`
    })

    const {id: styleTagId, css, load, unload, isLoaded} = useStyleTag(customCss)

    onMounted(() => {
        load()
    })

    return {
        id,
        styleTagId,
        css,
        load,
        unload,
        isLoaded
    }
}
