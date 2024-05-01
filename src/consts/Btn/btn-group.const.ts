import {
  BORDER_PROPS, COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  DENSITY_PROPS,
  ELEVATION_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'

import {
  IBorderProps,
  IBtnGroupProps,
  IColorProps,
  ICommonsComponentProps, IDensityProps, IElevationProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export const BTN_GROUP_PROPS: IBtnGroupProps = {
  ...TAG_PROPS as ITagProps,
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...BORDER_PROPS as IBorderProps,
  ...ROUNDED_PROPS as IRoundedProps,
  ...DENSITY_PROPS as IDensityProps,
  ...ELEVATION_PROPS as IElevationProps,
  ...COLOR_PROPS as IColorProps,

  divided: undefined,
  items: undefined
}