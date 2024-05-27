import {
  BORDER_PROPS,
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  DIMENSIONS_PROPS,
  ELEVATION_PROPS,
  LOCATION_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  POSITION_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import { IAlertProps } from '@foxy/interfaces'

export const ALERT_PROPS: IAlertProps  = {
  ...COMMONS_COMPONENT_PROPS ,
  ...TAG_PROPS,
  ...COLOR_PROPS,
  ...BORDER_PROPS,
  ...DIMENSIONS_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...DENSITY_PROPS,
  ...ELEVATION_PROPS,
  ...LOCATION_PROPS,
  ...POSITION_PROPS,
  ...ROUNDED_PROPS,

  closable: undefined,
  closeIcon: undefined,
  closeLabel: undefined,
  icon: undefined,
  modelValue: undefined,
  prominent: undefined,
  title: undefined,
  text: undefined,
  status: undefined
}