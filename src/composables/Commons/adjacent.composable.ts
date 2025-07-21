import type { IAdjacentInnerProps, IAdjacentProps } from '@/interfaces'

import { getCurrentInstance } from "@/utils"

import { computed, ComputedRef, Ref, useSlots } from 'vue'

export function useAdjacent (props: IAdjacentProps, prependIcon: Ref | ComputedRef, appendIcon: Ref | ComputedRef) {
    const vm = getCurrentInstance('OrigamAdjacent')

    const slots = useSlots()

    const hasPrependMedia = computed(() => {
        return !!(props.prependAvatar || prependIcon.value)
    })
    const hasPrepend = computed(() => {
        return !!slots.prepend || hasPrependMedia.value
    })
    const hasAppendMedia = computed(() => {
        return !!(props.appendAvatar || appendIcon.value)
    })
    const hasAppend = computed(() => {
        return !!slots.append || hasAppendMedia.value
    })

    const onClickPrepend = (e: Event) => {
        vm.emit('click:prepend', e)
    }
    const onClickAppend = (e: Event) => {
        vm.emit('click:append', e)
    }

    return {
        hasPrependMedia,
        hasPrepend,
        hasAppendMedia,
        hasAppend,
        onClickPrepend,
        onClickAppend
    }
}

export function useAdjacentInner (props: IAdjacentInnerProps) {
    const vm = getCurrentInstance('OrigamAdjacentInner')

    const slots = useSlots()

    const hasPrependInnerMedia = computed(() => {
        return !!(props.prependInnerAvatar || props.prependInnerIcon)
    })
    const hasPrependInner = computed(() => {
        return slots.prependInner || hasPrependInnerMedia.value
    })
    const hasAppendInnerMedia = computed(() => {
        return !!(props.appendInnerAvatar || props.appendInnerIcon)
    })
    const hasAppendInner = computed(() => {
        return slots.appendInner || hasAppendInnerMedia.value
    })
    const hasClear = computed(() => {
        return props.clearable || slots.clear
    })

    const onClickPrependInner = (e: Event) => {
        vm.emit('click:prependInner', e)
    }
    const onClickAppendInner = (e: Event) => {
        vm.emit('click:appendInner', e)
    }
    const clickClear = (e: Event) => {
        vm.emit('click:clear', e)
    }

    return {
        hasPrependInnerMedia,
        hasPrependInner,
        hasAppendInnerMedia,
        hasAppendInner,
        hasClear,
        onClickPrependInner,
        onClickAppendInner,
        clickClear
    }
}
