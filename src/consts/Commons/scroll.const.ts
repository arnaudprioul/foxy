import { IScrollStrategyProps } from '@foxy/interfaces'

import { blockScrollStrategy, closeScrollStrategy, repositionScrollStrategy } from '@foxy/utils'

export const SCROLL_STRATEGIES = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy,
}

export const SCROLL_STRATEGIES_PROPS: IScrollStrategyProps = {
  scrollStrategy: undefined,
  contained: undefined
}