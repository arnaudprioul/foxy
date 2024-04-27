import { CARD_PROPS, COMMONS_COMPONENT_PROPS, OVERLAY_PROPS } from '@foxy/consts'

import { ICardProps, ICommonsComponentProps, IDialogProps, IOverlayProps } from '@foxy/interfaces'

export const DIALOG_PROPS: IDialogProps = {
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...OVERLAY_PROPS as IOverlayProps,
  ...CARD_PROPS as ICardProps,

  fullscreen: undefined,
  retainFocus: undefined,
  scrollable: undefined
}