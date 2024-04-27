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

export interface IOverlayProps extends ICommonsComponentProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
  absolute?: boolean,
  attach?: boolean | string | Element
  closeOnBack?: boolean
  contentClass?: any
  contentProps?: any
  disabled?: boolean
  noClickAnimation?: boolean
  modelValue?: boolean
  persistent?: boolean
  zIndex?: number | string
  disableGlobalStack?: boolean
}