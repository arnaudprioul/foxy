import { FOCUS_PROPS } from '@foxy/consts'

import { IValidationProps } from '@foxy/interfaces'

export const VALIDATION_PROPS: IValidationProps = {
  ...FOCUS_PROPS,

  disabled: undefined,
  error: undefined,
  errorMessages: undefined,
  maxErrors: undefined,
  name: undefined,
  label: undefined,
  readonly: undefined,
  rules: undefined,
  modelValue: undefined,
  validateOn: undefined,
  validationValue: undefined,
}