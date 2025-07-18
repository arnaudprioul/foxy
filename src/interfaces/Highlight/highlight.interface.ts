import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from "@foxui/interfaces"

export interface IHighlightProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IElevationProps, IColorProps {
    autoEscape?: boolean
    text: string
}
