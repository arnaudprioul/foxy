import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerTitleProps,
    IRoundedProps,
    ISheetProps
} from "@origam/interfaces"

export interface IPickerProps extends ICommonsComponentProps, IColorProps, ISheetProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IPickerTitleProps {
    landscape?: boolean
    hideHeader?: boolean
}
