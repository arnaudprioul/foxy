import type { ICardProps, ICommonsComponentProps, IOverlayProps, IStatusProps } from '@foxui/interfaces'

export interface IDialogProps extends ICommonsComponentProps, IOverlayProps, ICardProps, IStatusProps {
    fullscreen?: boolean
    retainFocus?: boolean
    scrollable?: boolean
}
