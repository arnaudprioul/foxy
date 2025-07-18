import type {
    IBorderProps,
    ICommonsComponentProps,
    IDirectionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps,
    ITouchHandlers
} from '@foxy/interfaces'

import type { TIcon } from '@foxy/types'

import type { ComputedRef, Ref } from 'vue'

export interface IWindowProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IElevationProps {
    continuous?: boolean,
    nextIcon?: TIcon
    prevIcon?: TIcon
    reverse?: boolean,
    showArrows?: string | boolean
    touch?: boolean | ITouchHandlers
    modelValue?: any
    disabled?: boolean
    selectedClass?: string
    mandatory?: boolean
}

export interface IWindowProvide {
    transition: ComputedRef<undefined | string>
    transitionCount: Ref<number>
    transitionHeight: Ref<undefined | string>
    isReversed: Ref<boolean>
    rootRef: Ref<HTMLElement | undefined>
}
