import { ICommonsComponentProps, ITagProps, ITransitionComponentProps } from '@foxy/interfaces'

export interface IOverlayScrimProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IScrimProps {
  active?: boolean
}

export interface IScrimProps {
  scrim?: boolean | string
}