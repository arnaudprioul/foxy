import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps, IElevationProps,
    IMarginProps,
    IPaddingProps, IRoundedProps,
    ISheetProps
} from "@foxy/interfaces"

export interface IPickerProps extends ICommonsComponentProps, IColorProps, ISheetProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps {
    title?: string
    landscape?: boolean
    hideHeader?: boolean
}
