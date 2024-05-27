import { IColorProps, ICommonsComponentProps, ITagProps, IWindowProps } from '@foxy/interfaces'
import { TIcon, TInline } from '@foxy/types'

export interface ICarouselProps extends IWindowProps, IColorProps, ICommonsComponentProps, ITagProps {
  cycle?: boolean
  delimiterIcon?: TIcon
  height?: number | string
  hideDelimiters?: boolean
  hideDelimiterBackground?: boolean
  interval?: number | string
  progress?: boolean
  verticalDelimiters?: boolean | TInline
}