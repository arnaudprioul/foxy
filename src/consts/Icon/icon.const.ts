import { FoxyClassIcon, FoxySvgIcon } from '@foxy/components/Icon'

import type { IIconSet } from '@foxy/interfaces'

import type { TIconOptions } from '@foxy/types'
import type { InjectionKey } from 'vue'

export const FOXY_ICONS_KEY: InjectionKey<Required<TIconOptions>> = Symbol.for('foxy:icons')

export const DEFAULT_SETS: Record<string, IIconSet> = {
    svg: {
        component: FoxySvgIcon
    },
    class: {
        component: FoxyClassIcon
    }
}
