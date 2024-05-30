import { COMMONS_COMPONENT_PROPS, SELECTION_CONTROL_PROPS } from '@foxy/consts'
import { ICheckboxBtnProps } from '@foxy/interfaces'

export const CHECKBOX_BTN_PROPS: ICheckboxBtnProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...SELECTION_CONTROL_PROPS,

  indeterminate: undefined,
  indeterminateIcon: undefined,
}