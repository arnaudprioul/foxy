import {
  ACTIVATOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DIMENSIONS_PROPS,
  LAZY_PROPS,
  LOCATION_STRATEGIES_PROPS,
  SCROLL_STRATEGIES_PROPS,
  TRANSITION_PROPS,
  SCRIM_PROPS
} from '@foxy/consts'

import { IOverlayProps } from '@foxy/interfaces'

export const OVERLAY_PROPS: IOverlayProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...DIMENSIONS_PROPS,
  ...ACTIVATOR_PROPS,
  ...LOCATION_STRATEGIES_PROPS,
  ...SCROLL_STRATEGIES_PROPS,
  ...LAZY_PROPS,
  ...TRANSITION_PROPS,
  ...SCRIM_PROPS,

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