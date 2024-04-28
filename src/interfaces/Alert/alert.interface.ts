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
  ITagProps,
  IStatusProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IAlertProps extends ICommonsComponentProps, ITagProps, IColorProps, IBorderProps, IDimensionProps, IPaddingProps, IMarginProps, IDensityProps, IElevationProps, ILocationProps, IPositionProps, IRoundedProps, IStatusProps {
  closable?: boolean
  closeIcon?: TIcon
  closeLabel?: string
  modelValue?: boolean
  prominent?: boolean
  title?: string
  text?: string
}