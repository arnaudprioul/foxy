import {
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DIRECTION_PROPS,
  ELEVATION_PROPS,
  RIPPLE_PROPS,
  ROUNDED_PROPS,
  SIZES_PROPS
} from '@foxy/consts'

import { IRangeSliderThumbProps } from '@foxy/interfaces'

export const RANGE_SLIDER_THUMB_PROPS: IRangeSliderThumbProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...SIZES_PROPS,
  ...RIPPLE_PROPS,
  ...ELEVATION_PROPS,
  ...ROUNDED_PROPS,
  ...BORDER_PROPS,
  ...DIRECTION_PROPS,

  label: undefined,
  min: 0,
  max: 100,
  focused: undefined,
  modelValue: 0,
  position: 0,
  readonly: undefined,
  disabled: undefined
}