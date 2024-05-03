import {
  BORDER_PROPS,
  COMMONS_COMPONENT_PROPS,
  DIMENSIONS_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  ROUNDED_PROPS
} from '@foxy/consts'
import { IResponsiveProps } from '@foxy/interfaces'

export const RESPONSIVE_PROPS: IResponsiveProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...DIMENSIONS_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...BORDER_PROPS,
  ...ROUNDED_PROPS,

  aspectRatio: undefined,
  contentClass: undefined,
  inline: undefined
}