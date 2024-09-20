import {
    IAdjacentInnerProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps, IElevationProps,
    IFieldProps,
    IInputProps, IMarginProps,
    IPaddingProps, IRoundedProps
} from "@foxy/interfaces"

export interface ISearchFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IAdjacentInnerProps {
    throttler?: number
    autocomplete?: boolean
    minChars?: number
}
