import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IExpansionPanelProps,
    IGroupProps,
    ILazyProps,
    ILoaderProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@foxy/interfaces'

import type { TIcon } from '@foxy/types'

export interface IExpansionPanelsProps extends IColorProps, ITagProps, ICommonsComponentProps, IGroupProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps {
    flat?: boolean
    items?: Array<IExpansionPanelProps>
    accordion?: boolean
    popout?: boolean
    inset?: boolean
    expandIcon?: TIcon
    collapseIcon?: TIcon
    hideActions?: boolean
}
