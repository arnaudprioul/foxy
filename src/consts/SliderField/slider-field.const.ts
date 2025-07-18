import type { ISliderFieldProvide } from "@foxui/interfaces"
import type { InjectionKey } from 'vue'

export const FOXUI_SLIDER_FIELD_KEY: InjectionKey<ISliderFieldProvide> = Symbol.for('foxui:range-slider')
