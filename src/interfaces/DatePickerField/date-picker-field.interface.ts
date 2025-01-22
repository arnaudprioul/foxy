import {
    IAdjacentInnerProps,
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldProps,
    IInputProps,
    IMarginProps,
    IMenuProps,
    IPaddingProps,
    IRoundedProps,
    ITextFieldProps,
    ITransitionComponentProps
} from "@foxy/interfaces"

export interface IDatePickerFieldProps extends ICommonsComponentProps, IColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, ITransitionComponentProps {
    menu?: boolean,
    menuProps?: IMenuProps,
    range?: boolean
    openOnClear?: boolean
    closeText?: string
    openText?: string
}
