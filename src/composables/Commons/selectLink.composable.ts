import type { IUseLink } from '../../interfaces'

import { nextTick, watch } from 'vue'

export function useSelectLink (link: IUseLink, select?: (value: boolean, e?: Event) => void) {
    watch(() => link.isActive?.value, isActive => {
        if (link.isLink.value && isActive && select) {
            nextTick(() => {
                select(true)
            })
        }
    }, {
        immediate: true
    })
}
