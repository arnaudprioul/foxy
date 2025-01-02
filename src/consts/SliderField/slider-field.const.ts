import { ISliderFieldProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_SLIDER_FIELD_KEY: InjectionKey<ISliderFieldProvide> = Symbol.for('foxy:range-slider')
