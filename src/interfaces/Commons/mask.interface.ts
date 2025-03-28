import { DirectiveBinding } from 'vue'

export interface IMaskProps {
  mask?: string
}

export interface IMaskDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: string
  modifiers: {

  }
}

export interface IMaskHtmlElement extends HTMLElement {
  _mask?: IMaskHtmlElementMask
}

export interface IMaskHtmlElementMask {
  enabled?: boolean
  pattern?: string
}

export interface IMaskElement extends Element {
  dataset?: IMaskElementDataset
}

export interface IMaskElementDataset {
  isHiding?: string
  activated?: string
}

export interface IMaskNextCharOptional {
  __nextCharOptional__: boolean
}

export interface IMaskReplaces {
  '#': RegExp
  A: RegExp
  N: RegExp
  '?': IMaskNextCharOptional
  X: RegExp
}
