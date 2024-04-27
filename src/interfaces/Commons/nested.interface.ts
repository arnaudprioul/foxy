import { TOpenStrategy, TSelectStrategy } from '@foxy/types'

export interface INestedProps {
  selectStrategy?: TSelectStrategy
  openStrategy?: TOpenStrategy
  selected?: unknown[]
  opened?: unknown[]
  mandatory?: boolean
}