import { useSlots } from '@foxy/composables'
import { IAdjacentProps } from '@foxy/interfaces'

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