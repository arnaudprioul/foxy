import type {
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ISizeProps,
    ITagProps
} from '@foxy/interfaces'

import type { TIcon } from '@foxy/types'

export interface IBreadcrumbDividerProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IDensityProps, IColorProps, ISizeProps {
    divider: string | TIcon
}
