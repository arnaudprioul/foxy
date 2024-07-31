import {
  BORDER_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  DIMENSIONS_PROPS,
  ELEVATION_PROPS,
  HOVER_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { ITableProps } from '@foxy/interfaces'

export const TABLE_PROPS: ITableProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...BORDER_PROPS,
  ...ROUNDED_PROPS,
  ...ELEVATION_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...TAG_PROPS,
  ...HOVER_PROPS,
  ...DIMENSIONS_PROPS,
  ...DENSITY_PROPS,

  fixedHeader: undefined,
  fixedFooter: undefined
}