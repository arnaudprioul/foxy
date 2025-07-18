import type {
    IAdjacentProps,
    IBorderProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    ILinkProps,
    ILoaderProps,
    ILocationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRippleProps,
    IRoundedProps,
    ITagProps
} from '@origam/interfaces'

import type { TCardType } from '@origam/types'

export interface ICardProps extends ICommonsComponentProps, ITagProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, ILoaderProps, ILocationProps, IPositionProps, IRoundedProps, IMarginProps, IPaddingProps, ILinkProps, IRippleProps, IAdjacentProps {
    disabled?: boolean
    flat?: boolean
    hover?: boolean
    image?: string
    link?: boolean
    subtitle?: string | number
    text?: string | number
    title?: string | number
    type?: TCardType
}
