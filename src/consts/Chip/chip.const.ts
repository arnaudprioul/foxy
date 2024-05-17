import {
  ADJACENT_PROPS,
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS, DENSITY_PROPS, ELEVATION_PROPS, GROUP_ITEM_PROPS, LINK_PROPS, MARGIN_PROPS, PADDING_PROPS,
  RIPPLE_PROPS, ROUNDED_PROPS, SIZES_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IChipProps } from '@foxy/interfaces'

export const CHIP_PROPS: IChipProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...ADJACENT_PROPS,
  ...TAG_PROPS,
  ...COLOR_PROPS,
  ...RIPPLE_PROPS,
  ...BORDER_PROPS,
  ...ROUNDED_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...DENSITY_PROPS,
  ...LINK_PROPS,
  ...GROUP_ITEM_PROPS,
  ...SIZES_PROPS,
  ...ELEVATION_PROPS,

  activeClass: undefined,
  closable: undefined,
  closeIcon: undefined,
  closeLabel: undefined,
  draggable: undefined,
  filter: undefined,
  filterIcon: undefined,
  label: undefined,
  link: undefined,
  pill: undefined,
  text: undefined,
  modelValue: undefined,

  onClick: undefined,
  onClickOnce: undefined
}