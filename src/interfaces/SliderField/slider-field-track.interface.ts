import type { IColorProps, ICommonsComponentProps, IRoundedProps, ISizeProps } from '@origam/interfaces'

export interface ISliderFieldTrackProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRoundedProps {
    start?: number
    stop?: number
    disabled?: boolean
}
