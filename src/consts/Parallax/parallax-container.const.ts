import type { IParallaxProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'

export const FOXY_PARALLAX_KEY: InjectionKey<IParallaxProvide> = Symbol.for('foxy:parallax')
