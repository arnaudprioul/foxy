import type {
    IBorderProps,
    IBtnProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IBtnGroupProps extends ITagProps, ICommonsComponentProps, IRoundedProps, IBorderProps, IDensityProps, IElevationProps, IColorProps, IMarginProps, IPaddingProps {
    divided?: boolean
    items?: Array<IBtnProps>
}
