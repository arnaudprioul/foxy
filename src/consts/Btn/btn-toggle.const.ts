import type { IGroupProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'

export const FOXUI_BTN_TOGGLE_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxui:btn-toggle')
