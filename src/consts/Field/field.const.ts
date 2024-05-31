import {
  ADJACENT_INNER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  DIMENSIONS_PROPS,
  DIRECTION_PROPS,
  ELEVATION_PROPS,
} from '@foxy/consts'

import { IFieldProps } from '@foxy/interfaces'

export const FIELD_PROPS: IFieldProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...DENSITY_PROPS,
  ...COLOR_PROPS,
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