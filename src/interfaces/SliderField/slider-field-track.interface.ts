import type { IColorProps, ICommonsComponentProps, IRoundedProps, ISizeProps } from '../../interfaces'

export interface ISliderFieldTrackProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRoundedProps {
    start?: number
    stop?: number
    disabled?: boolean
}
