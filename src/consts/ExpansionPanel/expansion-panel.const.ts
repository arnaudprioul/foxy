import type { IGroupItemProvide } from '@/interfaces'

import type { InjectionKey } from 'vue'

export const ORIGAM_EXPANSION_PANEL_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('origam:expansion-panel')
