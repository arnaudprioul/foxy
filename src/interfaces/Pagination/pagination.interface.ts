import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps, ITagProps
} from "@foxy/interfaces"

import { TIcon } from "@foxy/types"

export interface IPaginationProps extends ICommonsComponentProps, ITagProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps {
    start?: number
    modelValue?: number
    disabled?: boolean
    length?: number | string
    totalVisible?: number | string
    firstIcon?: TIcon
    prevIcon?: TIcon
    nextIcon?: TIcon
    lastIcon?: TIcon
    ariaLabel?: string
    pageAriaLabel?: string
    currentPageAriaLabel?: string
    firstAriaLabel?: string
    previousAriaLabel?: string
    nextAriaLabel?: string
    lastAriaLabel?: string
    ellipsis?: string
    showFirstLastPage?: boolean
}
