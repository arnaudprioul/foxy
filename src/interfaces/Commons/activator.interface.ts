import { IDelayProps } from '@foxy/interfaces'

import { ComponentPublicInstance } from 'vue'

export interface IActivatorProps extends IDelayProps {
  target?: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance | [x: number, y: number] | undefined
  activator?: 'parent' | (string & {}) | Element | ComponentPublicInstance | undefined
  activatorProps?: Record<string, any>

  openOnClick?: boolean | undefined
  openOnHover?: boolean
  openOnFocus?: boolean | undefined

  closeOnContentClick?: boolean
}