import {
  COLOR_PROPS,
  COMMONS_COMPONENT_PROPS,
  LAZY_PROPS,
  RESPONSIVE_PROPS,
  ROUNDED_PROPS,
  TRANSITION_PROPS
} from '@foxy/consts'

import { IImgProps } from '@foxy/interfaces'

export const IMG_PROPS: IImgProps = {
  ... COLOR_PROPS,
  ... COMMONS_COMPONENT_PROPS,
  ...ROUNDED_PROPS,
  ...RESPONSIVE_PROPS,
  ...TRANSITION_PROPS,
  ...LAZY_PROPS,

  alt: undefined,
  cover: undefined,
  draggable: undefined,
  gradient: undefined,
  lazySrc: undefined,
  options: undefined,
  sizes: undefined,
  src: undefined,
  crossorigin: undefined,
  referrerpolicy: undefined,
  srcset: undefined,
  position: undefined,
}