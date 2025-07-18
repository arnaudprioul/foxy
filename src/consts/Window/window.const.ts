import type { IGroupItemProvide, IWindowProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'

export const FOXUI_WINDOW_KEY: InjectionKey<IWindowProvide> = Symbol.for('foxui:window')
export const FOXUI_WINDOW_GROUP_KEY: InjectionKey<IGroupItemProvide> = Symbol.for('foxui:window-group')
