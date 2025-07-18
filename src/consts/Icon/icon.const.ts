import { FoxuiClassIcon, FoxuiSvgIcon } from '@foxui/components/Icon'

import type { IIconSet } from '@foxui/interfaces'

import type { TIconOptions } from '@foxui/types'
import type { InjectionKey } from 'vue'

export const FOXUI_ICONS_KEY: InjectionKey<Required<TIconOptions>> = Symbol.for('foxui:icons')

export const DEFAULT_SETS: Record<string, IIconSet> = {
    svg: {
        component: FoxuiSvgIcon
    },
    class: {
        component: FoxuiClassIcon
    }
}
