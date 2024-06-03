import { IColorProps, ICommonsComponentProps, IRoundedProps, ISizeProps } from '@foxy/interfaces'

export interface IRangeSliderTrackProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRoundedProps {
  start?: number
  stop?: number
  disabled?: boolean
}