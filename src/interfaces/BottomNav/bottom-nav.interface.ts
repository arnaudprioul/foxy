import type {
    IBorderProps,
    IBtnProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IGroupProps,
    IHoverProps,
    ILayoutItemProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TMode } from '../../types'

export interface IBottomNavProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IBorderProps, IElevationProps, IMarginProps, IDimensionProps, IDensityProps, IRoundedProps, ILayoutItemProps, IGroupProps, IHoverProps {
    grow?: boolean
    mode?: TMode
    items?: Array<IBtnProps>
}
