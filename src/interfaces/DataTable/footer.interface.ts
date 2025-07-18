import type { IAlignProps, IColorProps, ICommonsComponentProps, IPaddingProps } from "@foxui/interfaces"

import type { TIcon } from "@foxui/types"

export interface IDataTableFooterProps extends ICommonsComponentProps, IColorProps, IPaddingProps, IAlignProps {
    prevIcon?: TIcon
    nextIcon?: TIcon
    firstIcon?: TIcon
    lastIcon?: TIcon
    itemsPerPageText?: string
    pageText?: string
    firstPageLabel?: string
    prevPageLabel?: string
    nextPageLabel?: string
    lastPageLabel?: string
    itemsPerPageOptions?: Array<number | { title: string, value: number }>
    showCurrentPage?: boolean
}
