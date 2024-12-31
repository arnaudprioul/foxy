import { COMMONS_COMPONENT_PROPS, DISPLAY_PROPS, LOADER_PROPS } from "@foxy/consts"
import { IDataTableRowsProps } from "@foxy/interfaces"

export const DATA_TABLE_ROWS_PROPS: IDataTableRowsProps = {
    ...COMMONS_COMPONENT_PROPS,
    ...LOADER_PROPS,
    ...DISPLAY_PROPS,

    hideNoData: undefined,
    items: undefined,
    noDataText: undefined,
    rowProps: undefined,
    cellProps: undefined
}
