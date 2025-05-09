import type { IGroupItemProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'

export const FOXY_EXPANSION_PANEL_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxy:expansion-panel')
