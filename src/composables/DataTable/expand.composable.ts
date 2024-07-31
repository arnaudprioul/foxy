import { useVModel } from '@foxy/composables'

import { FOXY_DATA_TABLE_EXPAND_KEY } from '@foxy/consts'

import { IDataTableExpandProps, IDataTableItem, IDataTableProvideExpanded } from '@foxy/interfaces'

import { provide, toRef } from 'vue'

export function provideExpanded (props: IDataTableExpandProps): IDataTableProvideExpanded {
  const expandOnClick = toRef(props, 'expandOnClick')
  const expanded = useVModel(props, 'expanded', props.expanded, v => {
    return new Set(v)
  }, v => {
    return [...v.values()]
  })

  const expand = (item: IDataTableItem, value: boolean) => {
    const newExpanded = new Set(expanded.value)

    if (!value) {
      newExpanded.delete(item.value)
    } else {
      newExpanded.add(item.value)
    }

    expanded.value = newExpanded
  }
  const isExpanded = (item: IDataTableItem) => {
    return expanded.value.has(item.value)
  }
  const toggleExpand = (item: IDataTableItem) => {
    expand(item, !isExpanded(item))
  }

  const data = { expand, expanded, expandOnClick, isExpanded, toggleExpand }

  provide(FOXY_DATA_TABLE_EXPAND_KEY, data)

  return data
}