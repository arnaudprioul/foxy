import type { TOpenStrategy, TOpenStrategyFns, TSelectStrategy, TSelectStrategyFn } from '@origam/types'

export interface INestedProps {
    selectStrategy?: TSelectStrategy | TSelectStrategyFn
    openStrategy?: TOpenStrategy | TOpenStrategyFns
    selected?: Array<unknown>
    opened?: Array<unknown>
    mandatory?: boolean
}
