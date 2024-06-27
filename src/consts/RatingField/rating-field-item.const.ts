import {
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  ELEVATION_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  RIPPLE_PROPS,
  ROUNDED_PROPS,
  SIZES_PROPS
} from '@foxy/consts'

import { IRatingFieldItemProps } from '@foxy/interfaces'

export const RATING_FIELD_ITEM_PROPS: IRatingFieldItemProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...DENSITY_PROPS,
  ...RIPPLE_PROPS,
  ...SIZES_PROPS,
  ...BORDER_PROPS,
  ...MARGIN_PROPS,
  ...PADDING_PROPS,
  ...ELEVATION_PROPS,
  ...ROUNDED_PROPS,

  name: undefined,
  index: undefined,
  value: 0,
  showStar: undefined,
  isFilled: undefined,
  isHovered: undefined,
  isHovering: undefined,
  disabled: undefined,
  fullIcon: undefined,
  emptyIcon: undefined,
  halfIncrements: undefined,
  checked: undefined
}