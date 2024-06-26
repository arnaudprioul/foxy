import { IItemProps, IListItem } from '@foxy/interfaces'

import { deepEqual, transformItem, transformItems } from '@foxy/utils'

import { computed } from 'vue'

export function useItems (props: IItemProps) {
  const items = computed(() => {
    if (props.items) {
      return transformItems(props, props.items)
    }

    return []
  })
  const hasNullItem = computed(() => {
    return items.value.some((item) => {
      return item.value === null
    })
  })

  const transformIn = (value: any[]): IListItem[] => {
    if (!hasNullItem.value) {
      // When the model value is null, return an InternalItem
      // based on null only if null is one of the items
      value = value.filter(v => v !== null)
    }

    return value.map((v) => {
      if (props.returnObject && typeof v === 'string') {
        // String model value means value is a custom input value from combobox
        // Don't look up existing items if the model value is a string
        return transformItem(props, v)
      }

      return items.value.find((item) => {
        return props.valueComparator ? props.valueComparator(v, item.value) : deepEqual(v, item.value)
      }) || transformItem(props, v)
    }) as IListItem[]
  }

  const transformOut = (value: IListItem[]): any[] => {
    return props.returnObject
        ? value.map(({ raw }) => raw)
        : value.map(({ value }) => value)
  }

  return { items, transformIn, transformOut }
}