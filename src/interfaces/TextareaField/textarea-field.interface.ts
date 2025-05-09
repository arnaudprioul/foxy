import {
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
} from '@foxy/interfaces'

export interface ITextareaFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IAdjacentInnerProps {
    autoGrow?: boolean
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    prefix?: string
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    noResize?: boolean
    rows?: number | string
    maxRows?: number | string
    suffix?: string
    modelModifiers?: string | boolean
}
