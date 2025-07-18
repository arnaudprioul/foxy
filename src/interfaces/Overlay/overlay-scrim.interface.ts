import type { ICommonsComponentProps, ITagProps, ITransitionComponentProps } from '@foxui/interfaces'

export interface IOverlayScrimProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IScrimProps {
    active?: boolean
}

export interface IScrimProps {
    scrim?: boolean | string
}
