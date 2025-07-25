import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IContainerProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IColorProps {
    fluid?: boolean
    fullscreen?: boolean
}
