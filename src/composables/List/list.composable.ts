import { FOXUI_LIST_KEY } from '@foxui/consts'

import { ComputedRef, inject, provide, shallowRef } from 'vue'

export function useCreateList () {
    const parent = inject(FOXUI_LIST_KEY, {
        hasPrepend: shallowRef(false),
        updateHasPrepend: () => null,
        hasAppend: shallowRef(false),
        updateHasAppend: () => null
    })

    const data = {
        hasPrepend: shallowRef(false),
        hasAppend: shallowRef(false),
        updateHasPrepend: (value: ComputedRef<boolean>) => {
            if (value) data.hasPrepend.value = value.value
        },
        updateHasAppend: (value: ComputedRef<boolean>) => {
            if (value) data.hasAppend.value = value.value
        }
    }

    provide(FOXUI_LIST_KEY, data)

    return parent
}

export function useList () {
    return inject(FOXUI_LIST_KEY, null)
}
