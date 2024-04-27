import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'


export interface IAvatarProps extends ICommonsComponentProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps {
  start?: boolean,
  end?: boolean,
  icon?: TIcon,
  image?: string,
  text?: string,
}