import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps, ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IBreadcrumbDividerProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IDensityProps, IColorProps, IBorderProps, IRoundedProps, ISizeProps {
  divider: string | TIcon
}