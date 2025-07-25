import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IGroupItemProps,
    IHoverProps,
    ILinkProps,
    ILoaderProps,
    ILocationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps,
    IStatusProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IBtnProps extends ICommonsComponentProps, IColorProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ISizeProps, ILinkProps, IRippleProps, ILoaderProps, IPositionProps, ILocationProps, IGroupItemProps, IPaddingProps, IMarginProps, IAdjacentProps, IStatusProps, IHoverProps {
    active?: boolean
    flat?: boolean,
    icon?: boolean | TIcon
    block?: boolean
    slim?: boolean
    stacked?: boolean
    text?: string
}
