import { computed, inject, Ref, unref } from 'vue'
import { OrigamComponentIcon, OrigamSvgIcon } from '../../components'

import { DEFAULT_SETS, MDI, MDI_ALIASES, ORIGAM_ICONS_KEY } from '../../consts'

import type { TIcon, TIconInstance, TIconOptions } from '../../types'

import { mergeDeep } from '../../utils'

export const useIcon = (props: Ref<TIcon | undefined>) => {
    const icons = inject(ORIGAM_ICONS_KEY)

    if (!icons) throw new Error('Missing Origam Icons provide!')

    const iconData = computed<TIconInstance>(() => {
        const iconAlias = unref(props)

        if (!iconAlias) return {component: OrigamComponentIcon}

        let icon: TIcon | undefined = iconAlias

        if (typeof icon === 'string') {
            icon = icon.trim()

            if (icon.startsWith('$')) {
                icon = icons.aliases?.[icon.slice(1)]
            }
        }

        if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`)

        if (Array.isArray(icon)) {
            return {
                component: OrigamSvgIcon,
                icon
            }
        } else if (typeof icon !== 'string') {
            return {
                component: OrigamComponentIcon,
                icon
            }
        }

        const iconSetName = Object.keys(icons.sets).find(
            setName => typeof icon === 'string' && icon.startsWith(`${setName}:`)
        )

        const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon
        const iconSet = icons.sets[iconSetName ?? icons.defaultSet]

        return {
            component: iconSet.component,
            icon: iconName
        }
    })

    return {iconData}
}

export function createIcons (options?: TIconOptions) {
    return mergeDeep({
        defaultSet: 'mdi',
        sets: {
            ...DEFAULT_SETS,
            mdi: MDI
        },
        aliases: {
            ...MDI_ALIASES
        }
    }, options)
}
