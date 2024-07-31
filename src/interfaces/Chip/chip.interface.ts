import {
  IAdjacentProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps, IDensityProps, IElevationProps, IGroupItemProps, ILinkProps, IMarginProps, IPaddingProps,
  IRippleProps, IRoundedProps, ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IChipProps extends ICommonsComponentProps, IAdjacentProps, ITagProps, IColorProps, IRippleProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps, IGroupItemProps, ILinkProps, ISizeProps, IElevationProps {
  activeClass?: string
  closable?: boolean
  closeIcon?: TIcon
  closeLabel?: string
  draggable?: boolean
  filter?: boolean
  filterIcon?: TIcon
  label?: boolean
  link?: boolean
  pill?: boolean
  text?: string
  modelValue?: boolean
}