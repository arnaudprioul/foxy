import { FoxyDataTable } from "@foxy/components"

import { DATATABLE_SELECT_STRATEGY } from '@foxy/enums'

import type { IDataTableItemKey } from '@foxy/interfaces'

export type TDataTableCompareFunction<T = any> = (a: T, b: T) => number | null

export type TDataTableHeaderCell =
    | Record<string, any>
    | ((data: Pick<IDataTableItemKey<any>, 'index' | 'item' | 'internalItem' | 'value'>) => Record<string, any>)

export type TDataTableRow<T> =
    | Record<string, any>
    | ((data: Pick<IDataTableItemKey<T>, 'index' | 'item' | 'internalItem'>) => Record<string, any>)

export type TDataTableCell<T> =
    | Record<string, any>
    | ((data: Pick<IDataTableItemKey<T>, 'index' | 'item' | 'internalItem' | 'value' | 'column'>) => Record<string, any>)

export type TDataTableSelectStrategy = `${DATATABLE_SELECT_STRATEGY}`

export type TFoxyDataTable = InstanceType<typeof FoxyDataTable>
