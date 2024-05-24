import {
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  LAZY_PROPS, LOADER_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IExpansionPanelContentProps } from '@foxy/interfaces'

export const EXPANSION_PANEL_CONTENT_PROPS: IExpansionPanelContentProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...TAG_PROPS,
  ...COLOR_PROPS,
  ...ROUNDED_PROPS,
  ...BORDER_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...DENSITY_PROPS,
  ...LAZY_PROPS,
  ...LOADER_PROPS,

  content: undefined
}