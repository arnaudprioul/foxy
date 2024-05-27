import { CARD_PROPS, COMMONS_COMPONENT_PROPS, OVERLAY_PROPS } from '@foxy/consts'

import { IDialogProps } from '@foxy/interfaces'

export const DIALOG_PROPS: IDialogProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...OVERLAY_PROPS,
  ...CARD_PROPS,

  fullscreen: undefined,
  retainFocus: undefined,
  scrollable: undefined
}