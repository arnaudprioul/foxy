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
} from '@origam/interfaces'

import type { TBreadcrumbItem, TIcon } from '@origam/types'

export interface IBreadcrumbProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps {
    activeClass?: string
    disabled?: boolean
    divider?: string | TIcon
    items?: Array<TBreadcrumbItem>
}
