import type { IDataTableItem, IDataTableItemsProps, IInternalDataTableHeader } from '@foxui/interfaces'

import { getPropertyFromItem } from '@foxui/utils'

export function transformDataTableItems (
    props: Omit<IDataTableItemsProps, 'items'>,
    items: Array<IDataTableItem> | undefined,
    columns: Array<IInternalDataTableHeader>
): Array<IDataTableItem> {
    return items?.map((item, index) => transformDataTableItem(props, item, index, columns)) || []
}

export function transformDataTableItem (
    props: Omit<IDataTableItemsProps, 'items'>,
    item: IDataTableItem,
    index: number,
    columns: Array<IInternalDataTableHeader>
): IDataTableItem {
    const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue)
    const selectable = getPropertyFromItem(item, props.itemSelectable, true)
    const itemColumns = columns.reduce((obj, column) => {
        if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value!)
        return obj
    }, {} as Record<string, unknown>)

    return {
        type: 'item',
        key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
        index,
        value,
        selectable,
        columns: itemColumns,
        raw: item
    }
}
