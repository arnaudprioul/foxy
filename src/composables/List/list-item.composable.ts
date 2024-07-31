import { IItemProps } from '@foxy/interfaces'

import { transformListItems } from '@foxy/utils'
import { computed } from 'vue'

export function useListItems (props: IItemProps & { itemType: string }) {
  const items = computed(() => {
    if (props.items) {
      return transformListItems(props, props.items)
    }

    return
  })

  return { items }
}