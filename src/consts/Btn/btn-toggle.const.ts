import { IGroupProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_BTN_TOGGLE_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxy:btn-toggle')