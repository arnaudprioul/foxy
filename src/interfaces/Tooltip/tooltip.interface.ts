import {
  IActivatorProps,
  ICommonsComponentProps,
  IDimensionProps,
  ILazyProps,
  ILocationStrategyProps,
  IOverlayProps,
  IScrimProps,
  IScrollStrategyProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

export interface ITooltipProps extends ICommonsComponentProps, IOverlayProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps{
  id?: string
  text?: string
}