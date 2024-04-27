import { IItemProps, IInternalListItem, IInternalListItemChildren } from '@foxy/interfaces'

import { getPropertyFromItem, omit } from '@foxy/utils'

export function transformItems (props: IItemProps & { itemType?: string }, items: (string | object)[]) {
  const array: IInternalListItemChildren[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function transformItem (props: Omit<IItemProps, 'items'>, item: any): IInternalListItem {
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
    children: Array.isArray(children) ? transformItems(props, children) : undefined,
    raw: item,
  }
}