import { IParallaxProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_PARALLAX_KEY: InjectionKey<IParallaxProvide> = Symbol.for('foxy:parallax')