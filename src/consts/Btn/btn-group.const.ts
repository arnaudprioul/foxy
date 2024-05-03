import {
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  ELEVATION_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IBtnGroupProps } from '@foxy/interfaces'

export const BTN_GROUP_PROPS: IBtnGroupProps = {
  ...TAG_PROPS,
  ...COMMONS_COMPONENT_PROPS,
  ...BORDER_PROPS,
  ...ROUNDED_PROPS,
  ...DENSITY_PROPS,
  ...ELEVATION_PROPS,
  ...COLOR_PROPS,

  divided: undefined,
  items: undefined
}