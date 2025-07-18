import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '@foxy/interfaces'

export interface ITitleProps extends ITagProps, ICommonsComponentProps, IColorProps, IDensityProps, IPaddingProps, IMarginProps, IBorderProps {
    text?: string
}
