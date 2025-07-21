import type { IMenuProvide } from '@/interfaces'

import type { InjectionKey } from 'vue'

export const ORIGAM_MENU_KEY: InjectionKey<IMenuProvide> = Symbol.for('origam:menu')
