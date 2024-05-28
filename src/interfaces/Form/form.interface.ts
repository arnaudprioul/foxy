import { ICommonsComponentProps } from '@foxy/interfaces'
import { TEventProp, TValidateOn } from '@foxy/types'

import { ComponentInternalInstance, ComputedRef, Raw, Ref } from 'vue'

export interface IFormProvide {
  register: (item: {
    id: number | string
    vm: ComponentInternalInstance
    validate: () => Promise<Array<string>>
    reset: () => Promise<void>
    resetValidation: () => Promise<void>
  }) => void
  unregister: (id: number | string) => void
  update: (id: number | string, isValid: boolean | undefined, errorMessages: Array<string>) => void
  items?: Ref<Array<IFormField>>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating?: Ref<boolean>
  isValid: Ref<boolean | null | undefined>
  validateOn: Ref<TValidateOn | undefined>
}

export interface IFormProps extends ICommonsComponentProps {
  disabled?: boolean
  fastFail?: boolean
  readonly?: boolean
  modelValue?: boolean | null
  'onUpdate:modelValue'?: TEventProp<[boolean | null]> | undefined
  validateOn?: TValidateOn
}

export interface IFormField {
  id: number | string
  validate: () => Promise<Array<string>>
  reset: () => Promise<void>
  resetValidation: () => Promise<void>
  vm: Raw<ComponentInternalInstance>
  isValid?: boolean | null
  errorMessages: Array<string>
}

export interface ISubmitEventPromise extends SubmitEvent, Promise<IFormValidationResult> {
}

export interface IFormValidationResult {
  valid: boolean
  errors: IFieldValidationResult[]
}

export interface IFieldValidationResult {
  id: number | string
  errorMessages: string[]
}