import { IN_BROWSER } from '@foxui/consts'
import { consoleWarn } from '@foxui/utils'

import { computed, Ref } from 'vue'

export function useTeleport (target: Ref<boolean | string | Element>) {
    const teleportTarget = computed(() => {
        const _target = target.value

        if (_target === true || !IN_BROWSER) return undefined

        const targetElement =
            _target === false ? document.body
                : typeof _target === 'string' ? document.querySelector(_target)
                    : _target

        if (targetElement == null) {
            consoleWarn(`Unable to locate target ${_target}`)

            return undefined
        }

        let container = targetElement.querySelector(':scope > .foxui-overlay-container')

        if (!container) {
            container = document.createElement('div')
            container.className = 'foxui-overlay-container'
            targetElement.appendChild(container)
        }

        return container
    })

    return {teleportTarget}
}
