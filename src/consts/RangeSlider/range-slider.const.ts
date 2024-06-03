import { IRangeSliderProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_RANGE_SLIDER_KEY: InjectionKey<IRangeSliderProvide> = Symbol.for('foxy:range-slider')