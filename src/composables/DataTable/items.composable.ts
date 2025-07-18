import type { IDataTableItemsProps, IInternalDataTableHeader } from '@origam/interfaces'

import { transformDataTableItems } from '@origam/utils'

import { computed, Ref } from 'vue'

export function useDataTableItems (props: IDataTableItemsProps, columns: Ref<Array<IInternalDataTableHeader>>) {
    const items = computed(() => transformDataTableItems(props, props.items, columns.value))

    return {items}
}
