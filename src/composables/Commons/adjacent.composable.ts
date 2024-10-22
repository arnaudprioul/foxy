import {useSlots} from '@foxy/composables'

import {IAdjacentInnerProps, IAdjacentProps} from '@foxy/interfaces'

import {computed} from 'vue'
import {getCurrentInstance} from "@foxy/utils";

export function useAdjacent(props: IAdjacentProps) {
    const vm = getCurrentInstance('FoxyAdjacent')

    const {hasSlot} = useSlots()

    const hasPrependMedia = computed(() => {
        return !!(props.prependAvatar || props.prependIcon)
    })
    const hasPrepend = computed(() => {
        return hasSlot('prepend') || hasPrependMedia.value
    })
    const hasAppendMedia = computed(() => {
        return !!(props.appendAvatar || props.appendIcon)
    })
    const hasAppend = computed(() => {
        return hasSlot('append') || hasAppendMedia.value
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

export function useAdjacentInner(props: IAdjacentInnerProps) {
    const vm = getCurrentInstance('FoxyAdjacentInner')

    const {hasSlot} = useSlots()

    const hasPrependInnerMedia = computed(() => {
        return !!(props.prependInnerAvatar || props.prependInnerIcon)
    })
    const hasPrependInner = computed(() => {
        return hasSlot('prependInner') || hasPrependInnerMedia.value
    })
    const hasAppendInnerMedia = computed(() => {
        return !!(props.appendInnerAvatar || props.appendInnerIcon)
    })
    const hasAppendInner = computed(() => {
        return hasSlot('appendInner') || hasAppendInnerMedia.value
    })
    const hasClear = computed(() => {
        return props.clearable || hasSlot('clear')
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