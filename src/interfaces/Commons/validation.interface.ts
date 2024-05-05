import { IFocusProps } from '@foxy/interfaces'

import { TValidateOn } from '@foxy/types'

export interface IValidationProps extends IFocusProps {
  disabled?: boolean
  error?: boolean
  errorMessages?: Array<string> | string
  maxErrors?: number | string
  name?: string
  label?: string
  readonly?: boolean
  rules?: Array<any>
  modelValue?: any
  validateOn?: TValidateOn
  validationValue?: any
}

export interface IValidationFieldResult {
  id: number | string
  errorMessages: Array<string>
}