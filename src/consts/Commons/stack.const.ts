import type { IStackProvide } from '@foxui/interfaces'

import type { InjectionKey } from 'vue'
import { reactive } from 'vue'

export const FOXUI_STACK_KEY: InjectionKey<IStackProvide> = Symbol.for('foxui:stack')

export const GLOBAL_STACK = reactive<Array<[uid: number, zIndex: number]>>([])
