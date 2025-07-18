import type { IGroupItemProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'

export const FOXUI_EXPANSION_PANEL_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxui:expansion-panel')
