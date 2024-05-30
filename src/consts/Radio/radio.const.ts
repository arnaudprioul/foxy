import { COMMONS_COMPONENT_PROPS, INPUT_PROPS, RADIO_BTN_PROPS } from '@foxy/consts'
import { IRadioProps } from '@foxy/interfaces'

export const RADIO_PROPS: IRadioProps = {
  ...INPUT_PROPS,
  ...COMMONS_COMPONENT_PROPS,
  ...RADIO_BTN_PROPS
}