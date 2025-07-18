import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    ILayoutItemProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    IScrimProps,
    ITagProps,
    ITransitionComponentProps
} from '@foxui/interfaces'


export interface IDrawerProps extends ITagProps, ICommonsComponentProps, IBorderProps, IElevationProps, ILayoutItemProps, IRoundedProps, IColorProps, IDensityProps, IPaddingProps, IMarginProps, ITransitionComponentProps, IScrimProps {
    disableResizeWatcher?: boolean
    disableRouteWatcher?: boolean
    expandOnHover?: boolean
    floating?: boolean
    modelValue?: boolean
    permanent?: boolean | null
    rail?: boolean | null
    railWidth?: number | string
    temporary?: boolean
    touchless?: boolean
    width?: number | string
    sticky?: boolean
}
