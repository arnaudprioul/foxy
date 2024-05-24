import {
  ADJACENT_PROPS,
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  ELEVATION_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  RIPPLE_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IExpansionPanelHeaderProps } from '@foxy/interfaces'

export const EXPANSION_PANEL_HEADER_PROPS: IExpansionPanelHeaderProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...TAG_PROPS,
  ...COLOR_PROPS,
  ...ROUNDED_PROPS,
  ...BORDER_PROPS,
  ...ELEVATION_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...DENSITY_PROPS,
  ...RIPPLE_PROPS,
  ...ADJACENT_PROPS,

  expandIcon: undefined,
  collapseIcon: undefined,
  hideActions: undefined,
  focusable: undefined,
  static: undefined,
  readonly: undefined,
  title: undefined
}