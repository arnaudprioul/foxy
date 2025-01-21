import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps, IElevationProps,
    IMarginProps,
    IPaddingProps, IRoundedProps,
    ISheetProps
} from "@foxy/interfaces"
import { IPickerTitleProps } from "@foxy/interfaces/Picker/picker-title.interface.ts"

export interface IPickerProps extends ICommonsComponentProps, IColorProps, ISheetProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IPickerTitleProps {
    landscape?: boolean
    hideHeader?: boolean
}
