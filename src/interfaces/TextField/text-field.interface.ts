import {
    IBorderProps, IColorProps,
    ICommonsComponentProps, IDensityProps, IElevationProps,
    IFieldProps,
    IInputProps,
    IMarginProps,
    IPaddingProps, IRoundedProps
} from "@foxy/interfaces"

import { TTextFieldType } from "@foxy/types"

export interface ITextFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | Function
    prefix?: string
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    suffix?: string
    role?: string
    type?: TTextFieldType
    modelModifiers?: string | boolean
}
