import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  ILocationProps,
  IRoundedProps,
  ITagProps,
  ITransitionComponentProps,
  IStatusProps
} from '@foxy/interfaces'

export interface IBadgeProps extends ICommonsComponentProps, ITagProps, IBorderProps, IColorProps, ILocationProps, IRoundedProps, ITransitionComponentProps, IStatusProps {
  content?: number | string
  dot?: boolean
  floating?: boolean
  inline?: boolean
  label?: string
  max?: number | string
  modelValue?: boolean
  offsetX?: number | string
  offsetY?: number | string
}