import { IColorProps, ICommonsComponentProps, IDensityProps, IRippleProps } from '@foxy/interfaces'
import { TIcon } from '@foxy/types'

import { Ref } from 'vue'

export interface ISelectionControlGroupProps extends ICommonsComponentProps, IColorProps, IDensityProps, IRippleProps {
  disabled?: boolean
  error?: boolean
  inline?: boolean
  falseIcon?: TIcon
  trueIcon?: TIcon
  multiple?: boolean
  name?: string
  readonly?: boolean
  modelValue?: any
  type?: string
  valueComparator?: (a: any, b: any) => boolean
  items?: Array<any>
}

export interface ISelectionGroupContext {
  modelValue: Ref<any>
  forceUpdate: () => void
  onForceUpdate: (fn: () => void) => void
}