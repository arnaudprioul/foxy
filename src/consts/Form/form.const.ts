import type { IFormProvide } from '@foxy/interfaces'
import type { InjectionKey } from 'vue'

export const FOXY_FORM_KEY: InjectionKey<IFormProvide> = Symbol.for('foxy:form')
