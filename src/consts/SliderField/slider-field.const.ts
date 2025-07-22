import type { ISliderFieldProvide } from "../../interfaces"
import type { InjectionKey } from 'vue'

export const ORIGAM_SLIDER_FIELD_KEY: InjectionKey<ISliderFieldProvide> = Symbol.for('origam:range-slider')
