import {
  ACTIVATOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DIMENSIONS_PROPS, LAZY_PROPS,
  LOCATION_STRATEGIES_PROPS,
  SCROLL_STRATEGIES_PROPS,
  TRANSITION_PROPS,
  SCRIM_PROPS
} from '@foxy/consts'

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

export const OVERLAY_PROPS: IOverlayProps = {
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...DIMENSIONS_PROPS as IDimensionProps,
  ...ACTIVATOR_PROPS as IActivatorProps,
  ...LOCATION_STRATEGIES_PROPS as ILocationStrategyProps,
  ...SCROLL_STRATEGIES_PROPS as IScrollStrategyProps,
  ...LAZY_PROPS as ILazyProps,
  ...TRANSITION_PROPS as ITransitionComponentProps,
  ...SCRIM_PROPS as IScrimProps,

  attach: undefined,
  closeOnBack: undefined,
  contentClass: undefined,
  contentProps: undefined,
  disabled: undefined,
  noClickAnimation: undefined,
  modelValue: undefined,
  zIndex: undefined,
  disableGlobalStack: undefined,
  absolute: undefined,
  persistent: undefined
}