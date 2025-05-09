import type { IDelayProps } from '@foxy/interfaces'

import type { ComponentPublicInstance } from 'vue'

export interface IActivatorProps extends IDelayProps {
    target?: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance | [x: number, y: number] | undefined
    activator?: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance
    activatorProps?: any

    openOnClick?: boolean
    openOnContextMenu?: boolean
    openOnHover?: boolean
    openOnFocus?: boolean

    closeOnContentClick?: boolean
}
