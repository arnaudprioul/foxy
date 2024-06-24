import { IColorProps, ICommonsComponentProps, IRoundedProps, ISizeProps } from '@foxy/interfaces'

export interface ISliderFieldTrackProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRoundedProps {
  start?: number
  stop?: number
  disabled?: boolean
}