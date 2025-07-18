import { useToggleScope } from '@foxui/composables'
import { FOXUI_STACK_KEY, GLOBAL_STACK } from '@foxui/consts'
import type { IStackProvide } from "@foxui/interfaces"

import { getCurrentInstance } from '@foxui/utils'

import { computed, inject, onScopeDispose, provide, reactive, readonly, Ref, shallowRef, toRaw, watchEffect } from 'vue'

export function useStack (
    isActive: Readonly<Ref<boolean>>,
    zIndex: Readonly<Ref<string | number>>,
    disableGlobalStack: boolean
) {
    const vm = getCurrentInstance('useStack')
    const createStackEntry = !disableGlobalStack

    const parent = inject(FOXUI_STACK_KEY, undefined)
    const stack: IStackProvide = reactive({
        activeChildren: new Set<number>()
    })
    provide(FOXUI_STACK_KEY, stack)

    const _zIndex = shallowRef(+zIndex.value)
    useToggleScope(isActive, () => {
        const lastZIndex = GLOBAL_STACK.at(-1)?.[1]
        _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value

        if (createStackEntry) {
            GLOBAL_STACK.push([vm.uid, _zIndex.value])
        }

        parent?.activeChildren.add(vm.uid)

        onScopeDispose(() => {
            if (createStackEntry) {
                const idx = toRaw(GLOBAL_STACK).findIndex(v => v[0] === vm.uid)
                GLOBAL_STACK.splice(idx, 1)
            }

            parent?.activeChildren.delete(vm.uid)
        })
    })

    const globalTop = shallowRef(true)

    if (createStackEntry) {
        watchEffect(() => {
            const _isTop = GLOBAL_STACK.at(-1)?.[0] === vm.uid
            setTimeout(() => globalTop.value = _isTop)
        })
    }

    const localTop = computed(() => !stack.activeChildren.size)

    return {
        globalTop: readonly(globalTop),
        localTop,
        stackStyles: computed(() => ({zIndex: _zIndex.value}))
    }
}
