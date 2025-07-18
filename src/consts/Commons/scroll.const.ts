import { blockScrollStrategy, closeScrollStrategy, repositionScrollStrategy } from '@foxui/utils'

export const SCROLL_STRATEGIES = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
}
