import { useSlots } from '@foxy/composables'

import { IAdjacentInnerProps, IAdjacentProps } from '@foxy/interfaces'

import { computed } from 'vue'

export function useAdjacent (props: IAdjacentProps) {
  const { hasSlot } = useSlots()

  const emits = defineEmits(['click:append', 'click:prepend'])

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

  const handleClickPrepend = (e: Event) => {
    emits('click:prepend', e)
  }
  const handleClickAppend = (e: Event) => {
    emits('click:append', e)
  }

  return {
    hasPrependMedia,
    hasPrepend,
    hasAppendMedia,
    hasAppend,
    handleClickPrepend,
    handleClickAppend
  }
}

export function useAdjacentInner (props: IAdjacentInnerProps) {
  const { hasSlot } = useSlots()

  const emits = defineEmits(['click:appendInner', 'click:prependInner', 'click:clear'])

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
    return !!(props.clearable || hasSlot('clear'))
  })

  const handleClickPrependInner = (e: Event) => {
    emits('click:prependInner', e)
  }
  const handleClickAppendInner = (e: Event) => {
    emits('click:appendInner', e)
  }
  const handleClickClear = (e: Event) => {
    emits('click:clear', e)
  }

  return {
    hasPrependInnerMedia,
    hasPrependInner,
    hasAppendInnerMedia,
    hasAppendInner,
    hasClear,
    handleClickPrependInner,
    handleClickAppendInner,
    handleClickClear
  }
}