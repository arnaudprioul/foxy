import type { IGroupProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'

export const FOXY_BTN_TOGGLE_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxy:btn-toggle')
