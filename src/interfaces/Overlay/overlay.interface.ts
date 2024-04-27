import {
  IActivatorProps,
  ICommonsComponentProps,
  IDimensionProps,
  ILazyProps,
  ILocationStrategyProps,
  IScrimProps,
  IScrollStrategyProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

export interface IOverlayProps extends IOverlayCommonsProps {
  absolute?: boolean
  persistent?: boolean
}

export interface IOverlayCommonsProps extends ICommonsComponentProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps{
  attach?: boolean | string | Element
  closeOnBack?: boolean
  contentClass?: any
  contentProps?: any
  disabled?: boolean
  noClickAnimation?: boolean
  modelValue?: boolean
  zIndex?: number | string
  disableGlobalStack?: boolean
}