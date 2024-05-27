import { IGroupItemProvide } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const FOXY_EXPANSION_PANEL_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxy:expansion-panel')