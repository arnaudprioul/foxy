import type { IGroupItemProvide, IWindowProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'

export const FOXY_WINDOW_KEY: InjectionKey<IWindowProvide> = Symbol.for('foxy:window')
export const FOXY_WINDOW_GROUP_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxy:window-group')
