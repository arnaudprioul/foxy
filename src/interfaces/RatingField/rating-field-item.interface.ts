import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps,
    ITagProps
} from '@foxui/interfaces'

import type { TIcon } from '@foxui/types'

export interface IRatingFieldItemProps extends ICommonsComponentProps, ITagProps, IColorProps, IDensityProps, IRippleProps, ISizeProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IElevationProps {
    name?: string
    index?: number
    value: number
    label?: string
    showStar?: boolean
    isFilled?: boolean
    isHovered?: boolean
    isHovering?: boolean
    disabled?: boolean
    readonly?: boolean
    fullIcon?: TIcon
    emptyIcon?: TIcon
    halfIncrements?: boolean
    checked?: boolean
    length?: number
}
