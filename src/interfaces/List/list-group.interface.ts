import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@foxui/interfaces'

import type { TIcon } from '@foxui/types'

export interface IListGroupProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IAdjacentProps {
    collapseIcon?: TIcon
    expandIcon?: TIcon
    fluid?: boolean
    title?: string
    value?: any
}

export interface IListActivatorProps extends ICommonsComponentProps, ITagProps {

}
