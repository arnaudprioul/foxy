import { computed, inject, Ref, unref } from 'vue'

import { FoxySvgIcon, FoxyComponentIcon } from '@foxy/components'

import { MDI, MDI_ALIASES, DEFAULT_SETS, FOXY_ICONS_KEY } from '@foxy/consts'

import { TIcon, TIconInstance, TIconOptions } from '@foxy/types'

import { mergeDeep } from '@foxy/utils'

export const useIcon = (props: Ref<TIcon | undefined>) => {
  const icons = inject(FOXY_ICONS_KEY)

  if (!icons) throw new Error('Missing Foxy Icons provide!')

  const iconData = computed<TIconInstance>(() => {
    const iconAlias = unref(props)

    if (!iconAlias) return { component: FoxyComponentIcon }

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
        component: FoxySvgIcon,
        icon,
      }
    } else if (typeof icon !== 'string') {
      return {
        component: FoxyComponentIcon,
        icon,
      }
    }

    const iconSetName = Object.keys(icons.sets).find(
        setName => typeof icon === 'string' && icon.startsWith(`${setName}:`)
    )

    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet]

    return {
      component: iconSet.component,
      icon: iconName,
    }
  })

  return { iconData }
}

export function createIcons (options?: TIconOptions) {
  return mergeDeep({
    defaultSet: 'mdi',
    sets: {
      ...DEFAULT_SETS,
      mdi: MDI,
    },
    aliases: {
      ...MDI_ALIASES,
    },
  }, options)
}
