import type {
    ICommonsComponentProps,
    IDataTableGroup,
    IDataTableItem,
    IDisplayProps,
    ILoaderProps
} from '@origam/interfaces'

import type { TDataTableCell, TDataTableRow } from '@origam/types'

export interface IDataTableRowsProps extends ICommonsComponentProps, ILoaderProps, IDisplayProps {
    hideNoData?: boolean
    items?: Array<IDataTableItem | IDataTableGroup> | readonly (IDataTableItem | IDataTableGroup)[]
    noDataText?: string
    rowProps?: TDataTableRow<any>,
    cellProps?: TDataTableCell<any>
}

export interface IDataTableRowProps extends ICommonsComponentProps, IDisplayProps {
    item: IDataTableItem
    cellProps?: TDataTableCell<any>
}
