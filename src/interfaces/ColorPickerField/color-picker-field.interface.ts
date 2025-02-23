import {
    IAdjacentInnerProps,
    IAdjacentProps,
    IBorderProps, IColorPickerProps,
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

export interface IColorPickerFieldProps extends ICommonsComponentProps, IColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, ITransitionComponentProps {
    menu?: boolean,
    menuProps?: IMenuProps,
    openOnClear?: boolean
    closeText?: string
    openText?: string
    closeOnSelect?: boolean
}
