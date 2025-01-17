import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps, IRoundedProps,
    ITextareaFieldToolbarProps
} from "@foxy/interfaces"

export interface ITextareaFieldEditorProps extends ICommonsComponentProps, ITextareaFieldToolbarProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IDensityProps, IRoundedProps {
    fullscreen?: boolean
}
