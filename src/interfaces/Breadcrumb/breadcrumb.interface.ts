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
} from '@foxy/interfaces'

import type { TBreadcrumbItem, TIcon } from '@foxy/types'

export interface IBreadcrumbProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps {
    activeClass?: string
    disabled?: boolean
    divider?: string | TIcon
    items?: Array<TBreadcrumbItem>
}
