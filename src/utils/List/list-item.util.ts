import { IInternalListItem, IInternalListItemChildren, IItemProps } from '@foxy/interfaces'

import { getPropertyFromItem, omit } from '@foxy/utils'

export function transformListItems (props: IItemProps & { itemType?: string }, items: Array<(string | object)>) {
  const array: Array<IInternalListItemChildren> = []

  for (const item of items) {
    array.push(transformListItem(props, item))
  }

  return array
}

export function transformListItem (props: Omit<IItemProps, 'items'>, item: any): IInternalListItem {
  const title = getPropertyFromItem(item, props.itemTitle, item)
  const value = getPropertyFromItem(item, props.itemValue, title)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
      ? typeof item === 'object' && item != null && !Array.isArray(item)
          ? 'children' in item
              ? omit(item, ['children'])
              : item
          : undefined
      : getPropertyFromItem(item, props.itemProps)

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    title: String(_props.title ?? ''),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformListItems(props, children) : undefined,
    raw: item,
  }
}