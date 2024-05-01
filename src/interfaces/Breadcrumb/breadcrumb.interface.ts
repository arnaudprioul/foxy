import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TBreadcrumbItem, TIcon } from '@foxy/types'

export interface IBreadcrumbProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps {
  activeClass?: string
  disabled?: boolean
  divider?: string | TIcon
  items?: Array<TBreadcrumbItem>
}