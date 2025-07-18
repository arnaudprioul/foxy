import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRoundedProps,
    ITagProps
} from '@foxui/interfaces'


export interface IToolbarProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IDensityProps, IColorProps, IPaddingProps, IMarginProps, IPositionProps, IDimensionProps {
    collapse?: boolean
    flat?: boolean
    floating?: boolean
    title?: string
    modelValue?: boolean
}
