import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@foxui/interfaces'

import type { TBreadcrumbItem, TIcon } from '@foxui/types'

export interface IBreadcrumbProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps {
    activeClass?: string
    disabled?: boolean
    divider?: string | TIcon
    items?: Array<TBreadcrumbItem>
}
