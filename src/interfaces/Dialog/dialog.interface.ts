import type { ICardProps, ICommonsComponentProps, IOverlayProps, IStatusProps } from '@foxy/interfaces'

export interface IDialogProps extends ICommonsComponentProps, IOverlayProps, ICardProps, IStatusProps {
    fullscreen?: boolean
    retainFocus?: boolean
    scrollable?: boolean
}
