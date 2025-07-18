import type { IParallaxProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'

export const FOXUI_PARALLAX_KEY: InjectionKey<IParallaxProvide> = Symbol.for('foxui:parallax')
