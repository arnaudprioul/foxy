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
} from "@origam/interfaces"
import type { TIcon } from "@origam/types"

export interface INumberFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    autofocus?: boolean
    placeholder?: string
    persistentPlaceholder?: boolean
    role?: string
    modelModifiers?: string | boolean
    inset?: boolean
    hideInput?: boolean
    modelValue?: number | null
    min?: number
    max?: number
    step?: number
    precision?: number
    incrementIcon?: TIcon
    decrementIcon?: TIcon
    holdDelay?: number
    holdRepeat?: number
    split?: boolean
    hideControls?: boolean
}
