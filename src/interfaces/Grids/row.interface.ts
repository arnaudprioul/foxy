import type {
    IAlignProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IJustifyProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '@origam/interfaces'

import type { TFlexDirection } from '@origam/types'

export interface IRowProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IColorProps, IDensityProps, IAlignProps, IJustifyProps {
    gutters?: string | number
    direction?: TFlexDirection
}
