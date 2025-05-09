import { IStackProvide } from '@foxy/interfaces'

import type { InjectionKey } from 'vue'
import { reactive } from 'vue'

export const FOXY_STACK_KEY: InjectionKey<IStackProvide> = Symbol.for('foxy:stack')

export const GLOBAL_STACK = reactive<Array<[uid: number, zIndex: number]>>([])
