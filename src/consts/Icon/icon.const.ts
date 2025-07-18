import { OrigamClassIcon, OrigamSvgIcon } from '@origam/components/Icon'

import type { IIconSet } from '@origam/interfaces'

import type { TIconOptions } from '@origam/types'
import type { InjectionKey } from 'vue'

export const ORIGAM_ICONS_KEY: InjectionKey<Required<TIconOptions>> = Symbol.for('origam:icons')

export const DEFAULT_SETS: Record<string, IIconSet> = {
    svg: {
        component: OrigamSvgIcon
    },
    class: {
        component: OrigamClassIcon
    }
}
