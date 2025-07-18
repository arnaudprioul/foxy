import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '@origam/interfaces'

export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
}
