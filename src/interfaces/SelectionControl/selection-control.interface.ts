import { IColorProps, ICommonsComponentProps, IDensityProps, IRippleProps } from '@foxy/interfaces'

import { TEventProp, TIcon } from '@foxy/types'

import { Ref } from 'vue'

export interface ISelectionControlProps extends ICommonsComponentProps, ISelectionControlGroupProps, IColorProps {
  label?: string
  trueValue?: any
  falseValue?: any
  value?: any
  required?: boolean

  'onClick:label'?: TEventProp
}

export interface ISelectionControlGroupProps extends ICommonsComponentProps, IColorProps, IDensityProps, IRippleProps{
  disabled?: boolean
  defaultsTarget?: string
  error?: boolean
  inline?: boolean
  falseIcon?: TIcon
  trueIcon?: TIcon
  multiple?: boolean
  name?: string
  readonly?: boolean
  modelValue?: any
  type?: string
  valueComparator?: Function
}

export interface ISelectionGroupContext {
  modelValue: Ref<any>
  forceUpdate: () => void
  onForceUpdate: (fn: () => void) => void
}