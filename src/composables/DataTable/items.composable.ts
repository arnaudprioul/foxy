import type { IDataTableItemsProps, IInternalDataTableHeader } from '@foxui/interfaces'

import { transformDataTableItems } from '@foxui/utils'

import { computed, Ref } from 'vue'

export function useDataTableItems (props: IDataTableItemsProps, columns: Ref<Array<IInternalDataTableHeader>>) {
    const items = computed(() => transformDataTableItems(props, props.items, columns.value))

    return {items}
}
