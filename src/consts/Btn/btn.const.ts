import {
  ADJACENT_PROPS,
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  DIMENSIONS_PROPS,
  ELEVATION_PROPS,
  GROUP_ITEM_PROPS,
  LINK_PROPS,
  LOADER_PROPS,
  LOCATION_PROPS,
  POSITION_PROPS,
  RIPPLE_PROPS,
  ROUNDED_PROPS,
  SIZES_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IBtnProps } from '@foxy/interfaces'

export const BTN_PROPS: IBtnProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...BORDER_PROPS,
  ...ROUNDED_PROPS,
  ...DENSITY_PROPS,
  ...ELEVATION_PROPS,
  ...COLOR_PROPS,
  ...DIMENSIONS_PROPS,
  ...ADJACENT_PROPS,
  ...RIPPLE_PROPS,
  ...TAG_PROPS,
  ...LOADER_PROPS,
  ...POSITION_PROPS,
  ...LOCATION_PROPS,
  ...GROUP_ITEM_PROPS,
  ...LINK_PROPS,
  ...SIZES_PROPS,

  active: undefined,
  flat: undefined,
  icon: undefined,
  block: undefined,
  slim: undefined,
  stacked: undefined,
  text: undefined
}