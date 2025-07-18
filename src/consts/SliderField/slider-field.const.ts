import type { ISliderFieldProvide } from "@foxy/interfaces"
import type { InjectionKey } from 'vue'

export const FOXY_SLIDER_FIELD_KEY: InjectionKey<ISliderFieldProvide> = Symbol.for('foxy:range-slider')
