import type { IMenuProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'

export const FOXY_MENU_KEY: InjectionKey<IMenuProvide> = Symbol.for('foxy:menu')
