import { TOpenStrategy, TOpenStrategyFns, TSelectStrategy, TSelectStrategyFn } from '@foxy/types'

export interface INestedProps {
  selectStrategy?: Record<string, TSelectStrategy> | TSelectStrategyFn
  openStrategy?: Record<string, TOpenStrategy> | TOpenStrategyFns
  selected?: Array<unknown>
  opened?: Array<unknown>
  mandatory?: boolean
}