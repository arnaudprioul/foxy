import { SCROLL_STRATEGIES } from '@origam/enums'
import type { IScrollStrategyData, IScrollStrategyProps } from '@origam/interfaces'

import { EffectScope } from 'vue'

export type TScrollStrategyFn = (data: IScrollStrategyData, props: IScrollStrategyProps, scope: EffectScope) => void

export type TScrollStrategy = `${SCROLL_STRATEGIES}`
