import type {
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ISizeProps,
    ITagProps
} from '@origam/interfaces'

import type { TIcon } from '@origam/types'

export interface IBreadcrumbDividerProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IDensityProps, IColorProps, ISizeProps {
    divider: string | TIcon
}
