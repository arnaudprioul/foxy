import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IHoverProps,
    ILocationProps,
    IRoundedProps,
    IStatusProps,
    ITagProps,
    ITransitionComponentProps
} from '@foxui/interfaces'

export interface IBadgeProps extends ICommonsComponentProps, ITagProps, IBorderProps, IColorProps, ILocationProps, IRoundedProps, ITransitionComponentProps, IStatusProps, IHoverProps, IElevationProps {
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
