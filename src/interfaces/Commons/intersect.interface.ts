import { TObserveHandler } from '@foxy/types'

import { DirectiveBinding } from 'vue'

export interface IObserveDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: TObserveHandler | { handler: TObserveHandler, options?: IntersectionObserverInit }
  modifiers: {
    once?: boolean
    quiet?: boolean
  }
}