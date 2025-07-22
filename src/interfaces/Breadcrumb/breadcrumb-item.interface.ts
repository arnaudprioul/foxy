import type {
    IActiveProps,
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IHoverProps,
    ILinkProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IDensityProps, IAdjacentProps, IHoverProps, IActiveProps {
    title: string
    disabled?: boolean
}
