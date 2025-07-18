import type { IGroupProvide } from '@origam/interfaces'

import type { InjectionKey } from 'vue'

export const ORIGAM_BTN_TOGGLE_KEY: InjectionKey<IGroupProvide> = Symbol.for('origam:btn-toggle')
