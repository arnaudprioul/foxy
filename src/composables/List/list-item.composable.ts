import { computed } from 'vue'

import { IItemProps } from '@foxy/interfaces'

import { transformItems } from '@foxy/utils'

export function useListItems (props: IItemProps & { itemType: string }) {
  const items = computed(() => {
    if (props.items) {
      return transformItems(props, props.items)
    }

    return
  })

  return { items }
}