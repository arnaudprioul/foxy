import { COMMONS_COMPONENT_PROPS, INPUT_PROPS, SELECTION_CONTROL_PROPS } from '@foxy/consts'

import { ICheckboxBtnProps, ICheckboxProps } from '@foxy/interfaces'

export const CHECKBOX_BTN_PROPS: ICheckboxBtnProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...SELECTION_CONTROL_PROPS,

  indeterminate: undefined,
  indeterminateIcon: undefined,
}

export const CHECKBOX_PROPS: ICheckboxProps = {
  ...INPUT_PROPS,
  ...COMMONS_COMPONENT_PROPS,
  ...CHECKBOX_BTN_PROPS
}

