import type {
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
} from '@origam/interfaces'

import type { TTextFieldType } from '@origam/types'

export interface ITextFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    role?: string
    type?: TTextFieldType
    modelModifiers?: string | boolean
}
