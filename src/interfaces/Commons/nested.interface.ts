import { TOpenStrategy, TSelectStrategy } from '@foxy/types'

export interface INestedProps {
  selectStrategy?: TSelectStrategy
  openStrategy?: TOpenStrategy
  selected?: Array<unknown>
  opened?: Array<unknown>
  mandatory?: boolean
}