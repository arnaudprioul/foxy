import { IMenuProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_MENU_KEY: InjectionKey<IMenuProvide> = Symbol.for('foxy:menu')