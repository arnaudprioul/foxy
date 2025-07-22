import type { Ref } from 'vue'
import type { IDimensionProps } from '../../interfaces'

import type { TAnchor, TLocationStrategy, TLocationStrategyFn } from '../../types'

export interface ILocationProps {
    location?: TAnchor
}

export interface ILocationStrategyProps extends IDimensionProps {
    locationStrategy?: TLocationStrategy | TLocationStrategyFn
    location?: TAnchor
    origin?: TAnchor | 'auto' | 'overlap'
    offset?: number | string | Array<number>
}

export interface ILocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>
    target: Ref<HTMLElement | [x: number, y: number] | undefined>
    isActive: Ref<boolean>
}
