import { SCROLL_STRATEGIES } from '@foxy/enums'
import { IScrollStrategyData, IScrollStrategyProps } from '@foxy/interfaces'

import { EffectScope } from 'vue'

export type TScrollStrategyFn = (data: IScrollStrategyData, props: IScrollStrategyProps, scope: EffectScope) => void

export type TScrollStrategy = `${SCROLL_STRATEGIES}`
