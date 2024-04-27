import { Ref } from 'vue'

import { TScrollBehavior, TScrollStrategy, TScrollStrategyFn } from '@foxy/types'

export interface IScrollProps {
  scrollBehavior?: TScrollBehavior
  scrollTarget?: string
  scrollThreshold?: string | number
}

export interface IScrollArguments {
  canScroll?: Readonly<Ref<boolean>>
}

export interface IScrollStrategyProps {
  scrollStrategy?: TScrollStrategy | TScrollStrategyFn
  contained?: boolean
}

export interface IScrollStrategyData {
  root: Ref<HTMLElement | undefined>
  contentEl: Ref<HTMLElement | undefined>
  targetEl: Ref<HTMLElement | undefined>
  isActive: Ref<boolean>
  updateLocation: Ref<((e: Event) => void) | undefined>
}