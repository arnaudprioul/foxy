import {
  IBorderProps, IColorProps,
  ICommonsComponentProps, IDensityProps, ILinkProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps,
  IAdjacentProps
} from '@foxy/interfaces'

export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IDensityProps, IAdjacentProps {
  title: string
  disabled?: boolean
  active?: boolean
  activeClass?: string
}