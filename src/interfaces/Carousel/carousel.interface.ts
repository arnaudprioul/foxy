import { IColorProps, ICommonsComponentProps, IDimensionProps, ITagProps, IWindowProps } from '@foxy/interfaces'
import { TIcon, TInline } from '@foxy/types'

export interface ICarouselProps extends IWindowProps, IColorProps, ICommonsComponentProps, ITagProps, IDimensionProps {
    cycle?: boolean
    delimiterIcon?: TIcon
    hideDelimiters?: boolean
    hideDelimiterBackground?: boolean
    interval?: number | string
    progress?: boolean
    verticalDelimiters?: boolean | TInline
}