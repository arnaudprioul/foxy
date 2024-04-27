import {
  IBorderProps, IColorProps,
  ICommonsComponentProps,
  IDensityProps, IDimensionProps,
  IElevationProps,
  ILocationProps,
  IMarginProps,
  IPaddingProps,
  IPositionProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TContextualType, TIcon } from '@foxy/types'

export interface IAlertProps extends ICommonsComponentProps, ITagProps, IColorProps, IBorderProps, IDimensionProps, IPaddingProps, IMarginProps, IDensityProps, IElevationProps, ILocationProps, IPositionProps, IRoundedProps {
  closable?: boolean
  closeIcon?: TIcon
  closeLabel?: string
  icon?: TIcon
  modelValue?: boolean
  prominent?: boolean
  title?: string
  text?: string
  status?: TContextualType
}