import type {
    IAudioProps,
    IBorderProps,
    IBox,
    ICommonsComponentProps,
    IDimensionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TParallaxEvent, TPoint } from '../../types'

import type { Ref } from 'vue'

export interface IParallaxProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IDimensionProps, IAudioProps {
    animationDuration?: number
    easing?: string
    perspective?: number
    event?: TParallaxEvent
    active?: boolean
    duration?: number
}

export interface IParallaxProvide {
    audioData: Ref<any>
    eventData: Ref<TPoint>
    movement: Ref<{ x: number, y: number, target?: IBox | DOMRect }>
    isMoving: Ref<boolean>
    event: Ref<TParallaxEvent>
    duration: Ref<number>
    easing: Ref<string>
    shape: Ref<IBox | null>
}
