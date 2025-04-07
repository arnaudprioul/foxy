import {
    IBorderProps, IColorProps,
    ICommonsComponentProps, IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from "@foxy/interfaces"

export interface IHighlightProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IElevationProps, IColorProps {
    autoEscape?: boolean
    text: string
}
