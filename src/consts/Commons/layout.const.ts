import type { ILayoutProvide } from '@foxui/interfaces'

import type { InjectionKey, ShallowRef } from 'vue'

export const FOXUI_LAYOUT_KEY: InjectionKey<ILayoutProvide> = Symbol.for('foxui:layout')
export const FOXUI_LAYOUT_ITEM_KEY: InjectionKey<ShallowRef<{ id: string; }>> = Symbol.for('foxui:layout-item')

export const ROOT_ZINDEX = 1000
