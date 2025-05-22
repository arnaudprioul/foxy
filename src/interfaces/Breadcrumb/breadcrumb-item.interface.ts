import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    ILinkProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@foxy/interfaces'

export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IDensityProps, IAdjacentProps {
    title: string
    disabled?: boolean
    active?: boolean
    activeClass?: string
    isLast?: boolean
}
