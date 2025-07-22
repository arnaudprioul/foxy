import type {
    IAdjacentInnerProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IFocusProps,
    ILoaderProps
} from '../../interfaces'

export interface IFieldProps extends ICommonsComponentProps, ILoaderProps, IColorProps, IAdjacentInnerProps, IFocusProps, IDensityProps {
    active?: boolean
    centerAffix?: boolean
    dirty?: boolean
    disabled?: boolean
    error?: boolean
    flat?: boolean
    label?: string
    prefix?: string
    suffix?: string
    persistentClear?: boolean
    reverse?: boolean
    singleLine?: boolean
    required?: boolean
}
