import {
  ADJACENT_INNER_PROPS,
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  DIMENSIONS_PROPS,
  DIRECTION_PROPS,
  ELEVATION_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  ROUNDED_PROPS,
} from '@foxy/consts'

import { IFieldProps } from '@foxy/interfaces'

export const FIELD_PROPS: IFieldProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...DENSITY_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...ROUNDED_PROPS,
  ...COLOR_PROPS,
  ...BORDER_PROPS,
  ...ELEVATION_PROPS,
  ...DIMENSIONS_PROPS,
  ...DIRECTION_PROPS,
  ...ADJACENT_INNER_PROPS,

  active: undefined,
  centerAffix: undefined,
  dirty: undefined,
  disabled: undefined,
  error: undefined,
  flat: undefined,
  label: undefined,
  prefix: undefined,
  suffix: undefined,
  persistentClear: undefined,
  reverse: undefined,
  singleLine: undefined,
  required: undefined
}