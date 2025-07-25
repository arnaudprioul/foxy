import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IExpansionPanelHeaderProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, IAdjacentProps, IRippleProps {
    expandIcon?: TIcon
    collapseIcon?: TIcon
    hideActions?: boolean
    focusable?: boolean
    static?: boolean
    readonly?: boolean
    title?: string
}
