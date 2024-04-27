import { DirectiveBinding } from 'vue'

export interface IClickOutsideDirectiveBinding extends DirectiveBinding {
  value: ((e: MouseEvent) => void) | IClickOutsideBindingArgs
}

export interface IClickOutsideBindingArgs {
  handler: (e: MouseEvent) => void
  closeConditional?: (e: Event) => boolean
  include?: () => HTMLElement[]
}