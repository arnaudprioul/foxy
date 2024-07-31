import { IDataTableItemsProps, IInternalDataTableHeader } from '@foxy/interfaces'

import { transformDataTableItems } from '@foxy/utils'

import { computed, Ref } from 'vue'

export function useDataTableItems (props: IDataTableItemsProps, columns: Ref<Array<IInternalDataTableHeader>>) {
  const items = computed(() => transformDataTableItems(props, props.items, columns.value))

  return { items }
}