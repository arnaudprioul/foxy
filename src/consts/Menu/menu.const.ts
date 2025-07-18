import type { IMenuProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'

export const FOXUI_MENU_KEY: InjectionKey<IMenuProvide> = Symbol.for('foxui:menu')
