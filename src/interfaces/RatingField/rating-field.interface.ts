import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IInputProps,
    ILabelProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps,
    ITagProps
} from '@origam/interfaces'

import type { TBlock, TIcon } from '@origam/types'

export interface IRatingFieldProps extends ICommonsComponentProps, IRippleProps, IDensityProps, IPaddingProps, IBorderProps, IMarginProps, IRoundedProps, IElevationProps, IColorProps, ISizeProps, ITagProps, IInputProps, ILabelProps {
    name?: string
    itemAriaLabel?: string
    clearable?: boolean
    disabled?: boolean
    emptyIcon?: TIcon
    fullIcon?: TIcon
    halfIncrements?: boolean
    hover?: boolean
    length?: number | string
    readonly?: boolean
    modelValue?: number | string
    itemLabels?: Array<string>
    itemLabelPosition?: TBlock
}
