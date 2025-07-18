import type {
    IAdjacentInnerProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldProps,
    IInputProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from "@foxui/interfaces"

import type { TIcon } from "@foxui/types"

export interface IPasswordFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IAdjacentInnerProps {
    onIcon?: TIcon
    offIcon?: TIcon
    placeholder?: string
    role?: string
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    maxlength?: number
}
