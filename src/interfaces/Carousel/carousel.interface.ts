import type { IColorProps, ICommonsComponentProps, IDimensionProps, ITagProps, IWindowProps } from '@foxui/interfaces'
import type { TIcon, TInline } from '@foxui/types'

export interface ICarouselProps extends IWindowProps, IColorProps, ICommonsComponentProps, ITagProps, IDimensionProps {
    cycle?: boolean
    delimiterIcon?: TIcon
    hideDelimiters?: boolean
    hideDelimiterBackground?: boolean
    interval?: number | string
    progress?: boolean
    verticalDelimiters?: boolean | TInline
}
