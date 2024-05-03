import {
  BORDER_PROPS,
  COMMONS_COMPONENT_PROPS, ELEVATION_PROPS,
  MARGIN_PROPS,
  PADDING_PROPS,
  ROUNDED_PROPS,
  TAG_PROPS
} from '@foxy/consts'
import { DIRECTION_PROPS } from '@foxy/consts/Commons/direction.const.ts'
import { IGroupItemProvide, IWindowProps, IWindowProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_WINDOW_KEY: InjectionKey<IWindowProvide> = Symbol.for('foxy:window')
export const FOXY_WINDOW_GROUP_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxy:window-group')

export const WINDOW_PROPS: IWindowProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...TAG_PROPS,
  ...DIRECTION_PROPS,
  ...BORDER_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,
  ...ROUNDED_PROPS,
  ...ELEVATION_PROPS,

  continuous:undefined,
  nextIcon:undefined,
  prevIcon:undefined,
  reverse:undefined,
  showArrows:undefined,
  touch:undefined,
  modelValue:undefined,
  disabled:undefined,
  selectedClass:undefined,
  mandatory:undefined,
}