import {
  IActivatorProps,
  ICommonsComponentProps,
  IDimensionProps,
  ILazyProps,
  ILocationStrategyProps, IOverlayCommonsProps,
  IScrimProps,
  IScrollStrategyProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

export interface ITooltipProps extends ICommonsComponentProps, IOverlayCommonsProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps{
  id?: string
  text?: string
}