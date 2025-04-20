import { IDimensionProps } from '@foxy/interfaces'

import { TAnchor, TLocationStrategy } from '@foxy/types'

import { TLocationStrategyFn } from '@foxy/types'
import { Ref } from 'vue'

export interface ILocationProps {
  location?: TAnchor
}

export interface ILocationStrategyProps extends IDimensionProps, ILocationProps {
  locationStrategy?: TLocationStrategy | TLocationStrategyFn
  origin?: TAnchor | 'auto' | 'overlap'
  offset?: number | string | Array<number>
}

export interface ILocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
}
