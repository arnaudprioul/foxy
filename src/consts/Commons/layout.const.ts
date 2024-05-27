import { ILayoutProvide } from '@foxy/interfaces'

import type { InjectionKey, ShallowRef } from 'vue'

export const FOXY_LAYOUT_KEY: InjectionKey<ILayoutProvide> = Symbol.for('foxy:layout')
export const FOXY_LAYOUT_ITEM_KEY: InjectionKey<ShallowRef<{ id: string; }> > = Symbol.for('foxy:layout-item')

export const ROOT_ZINDEX = 1000