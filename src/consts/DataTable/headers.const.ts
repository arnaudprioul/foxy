import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, DISPLAY_PROPS, LOADER_PROPS } from '@foxy/consts'

import { IDataTableHeadersProps, IHeaderCellProps, IInternalDataTableHeader } from '@foxy/interfaces'

import { InjectionKey, Ref } from 'vue'

export const FOXY_DATA_TABLE_HEADERS_KEY: InjectionKey<{
  headers: Ref<Array<Array<IInternalDataTableHeader>>>
  columns: Ref<Array<IInternalDataTableHeader>>
}> = Symbol.for('foxy:data-table-headers')

export const DEFAULT_HEADER = { title: '', sortable: false }
export const DEFAULT_ACTION_HEADER = { ...DEFAULT_HEADER, width: 48 }

export const DATA_TABLE_HEADER_CELL_PROPS: IHeaderCellProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,

  disableSort: false,
  headerProps: undefined,
  sticky: false,
  multiSort: false,
  sortAscIcon: undefined,
  sortDescIcon: undefined
}

export const DATA_TABLE_HEADERS_PROPS: IDataTableHeadersProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...DISPLAY_PROPS,
  ...LOADER_PROPS,
  ...DATA_TABLE_HEADER_CELL_PROPS
}
