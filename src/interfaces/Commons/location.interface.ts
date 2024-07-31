import { IDimensionProps } from '@foxy/interfaces'

import { TAnchor, TLocationStrategy } from '@foxy/types'

import { TLocationStrategyFn } from '@foxy/types'
import { Ref } from 'vue'

export interface ILocationProps {
  location?: Record<string, TAnchor>
}

export interface ILocationStrategyProps extends IDimensionProps {
  locationStrategy?: Record<string, TLocationStrategy> | TLocationStrategyFn
  location?: Record<string, TAnchor>
  origin?: Record<string, TAnchor | 'auto' | 'overlap'>
  offset?: number | string | Array<number>
}

export interface ILocationStrategyData {
  contentEl: Ref<HTMLElement | undefined>
  target: Ref<HTMLElement | [x: number, y: number] | undefined>
  isActive: Ref<boolean>
}