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

import {
  IAlertProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IDimensionProps,
  IElevationProps,
  ILocationProps,
  IMarginProps,
  IPaddingProps,
  IPositionProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export const ALERT_PROPS: IAlertProps  = {
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...TAG_PROPS as ITagProps,
  ...COLOR_PROPS as IColorProps,
  ...BORDER_PROPS as IBorderProps,
  ...DIMENSIONS_PROPS as IDimensionProps,
  ...PADDING_PROPS as IPaddingProps,
  ...MARGIN_PROPS as IMarginProps,
  ...DENSITY_PROPS as IDensityProps,
  ...ELEVATION_PROPS as IElevationProps,
  ...LOCATION_PROPS as ILocationProps,
  ...POSITION_PROPS as IPositionProps,
  ...ROUNDED_PROPS as IRoundedProps,

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