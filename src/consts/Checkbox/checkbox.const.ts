import { CHECKBOX_BTN_PROPS, COMMONS_COMPONENT_PROPS, INPUT_PROPS } from '@foxy/consts'

import { ICheckboxProps } from '@foxy/interfaces'

export const CHECKBOX_PROPS: ICheckboxProps = {
  ...INPUT_PROPS,
  ...COMMONS_COMPONENT_PROPS,
  ...CHECKBOX_BTN_PROPS
}

