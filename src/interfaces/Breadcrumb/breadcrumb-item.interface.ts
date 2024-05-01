import {
  IBorderProps, IColorProps,
  ICommonsComponentProps, IDensityProps, ILinkProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IDensityProps {
  appendAvatar?: string
  appendIcon?: TIcon
  prependAvatar?: string
  prependIcon?: TIcon
  title: string
  disabled?: boolean
  active?: boolean
  activeClass?: string
}