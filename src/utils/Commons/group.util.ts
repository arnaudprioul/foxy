import { IGroupItem } from '@foxy/interfaces'

import { deepEqual } from '@foxy/utils'

import { UnwrapRef } from 'vue'

export function getItemIndex (items: UnwrapRef<IGroupItem[]>, value: unknown) {
  const ids = getIds(items, [value])

  if (!ids.length) return -1

  return items.findIndex(item => item.id === ids[0])
}

export function getIds (items: UnwrapRef<IGroupItem[]>, modelValue: any[]) {
  const ids: number[] = []

  modelValue.forEach(value => {
    const item = items.find(item => deepEqual(value, item.value))
    const itemByIndex = items[value]

    if (item?.value != null) {
      ids.push(item.id)
    } else if (itemByIndex != null) {
      ids.push(itemByIndex.id)
    }
  })

  return ids
}

export function getValues (items: UnwrapRef<IGroupItem[]>, ids: any[]) {
  const values: unknown[] = []

  ids.forEach(id => {
    const itemIndex = items.findIndex(item => item.id === id)
    if (~itemIndex) {
      const item = items[itemIndex]
      values.push(item.value != null ? item.value : itemIndex)
    }
  })

  return values
}