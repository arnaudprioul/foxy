import { ICardProps, ICommonsComponentProps, IOverlayProps } from '@foxy/interfaces'

import { TContextualType, TIcon } from '@foxy/types'

export interface IDialogProps extends ICommonsComponentProps, IOverlayProps, ICardProps {
  fullscreen?: boolean
  retainFocus?: boolean
  scrollable?: boolean
  status?: TContextualType
  icon?: boolean | TIcon
}