import { SCROLL_STRATEGIES } from '@foxui/enums'
import type { IScrollStrategyData, IScrollStrategyProps } from '@foxui/interfaces'

import { EffectScope } from 'vue'

export type TScrollStrategyFn = (data: IScrollStrategyData, props: IScrollStrategyProps, scope: EffectScope) => void

export type TScrollStrategy = `${SCROLL_STRATEGIES}`
