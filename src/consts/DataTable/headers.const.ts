import { IInternalDataTableHeader } from '@foxy/interfaces'

import { InjectionKey, Ref } from 'vue'

export const FOXY_DATA_TABLE_HEADERS_KEY: InjectionKey<{
  headers: Ref<Array<Array<IInternalDataTableHeader>>>
  columns: Ref<Array<IInternalDataTableHeader>>
}> = Symbol.for('foxy:data-table-headers')

export const DEFAULT_HEADER = { title: '', sortable: false }
export const DEFAULT_ACTION_HEADER = { ...DEFAULT_HEADER, width: 48 }
