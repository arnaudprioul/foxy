import { useVModel } from '@foxy/composables'
import { FOXY_DATA_TABLE_GROUP_KEY } from '@foxy/consts'

import {
  IDataTableGroup,
  IDataTableGroupableItem,
  IDataTableGroupProps,
  IDataTableProvideGroup,
  IDataTableSortItem
} from '@foxy/interfaces'
import { flattenItems, groupItems } from '@foxy/utils'

import { computed, ComputedRef, inject, provide, ref, Ref } from 'vue'

export function createGroupBy (props: IDataTableGroupProps) {
  const groupBy = useVModel(props, 'groupBy')

  return { groupBy }
}

export function provideGroupBy (options: {
  groupBy: Ref<Array<IDataTableSortItem>>,
  sortBy: Ref<Array<IDataTableSortItem>>
}): IDataTableProvideGroup {
  const { groupBy, sortBy } = options
  const opened = ref(new Set<string>())

  const sortByWithGroups = computed(() => {
    return groupBy.value.map<IDataTableSortItem>(val => ({
      ...val,
      order: val.order ?? false,
    })).concat(sortBy.value)
  })

  const isGroupOpen = (group: IDataTableGroup) => {
    return opened.value.has(group.id)
  }
  const toggleGroup = (group: IDataTableGroup) => {
    const newOpened = new Set(opened.value)
    if (!isGroupOpen(group)) newOpened.add(group.id)
    else newOpened.delete(group.id)

    opened.value = newOpened
  }
  const extractRows = <T extends IDataTableGroupableItem> (items: (T | IDataTableGroup<T>)[]) => {
    const dive = (group: IDataTableGroup<T>): T[] => {
      const arr = []

      for (const item of group.items) {
        if ('type' in item && item.type === 'group') {
          arr.push(...dive(item))
        } else {
          arr.push(item as T)
        }
      }

      return arr
    }

    return dive({ type: 'group', items, id: 'dummy', key: 'dummy', value: 'dummy', depth: 0 })
  }

  const data = { sortByWithGroups, toggleGroup, opened, groupBy, extractRows, isGroupOpen }

  provide(FOXY_DATA_TABLE_GROUP_KEY, data)

  return data
}

export function useGroupedItems<T extends IDataTableGroupableItem> (
    items: ComputedRef<Array<T>>,
    groupBy: Ref<Array<IDataTableSortItem>>,
    opened: Ref<Set<string>>
) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value

    const groupedItems = groupItems(items.value as Array<T>, groupBy.value.map(item => item.key))

    return flattenItems(groupedItems, opened.value)
  })

  return { flatItems }
}

export function useGroupBy () {
  const data = inject(FOXY_DATA_TABLE_GROUP_KEY)

  if (!data) throw new Error('Missing group!')

  return data
}