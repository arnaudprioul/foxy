import { IFormProvide } from '@foxy/interfaces'
import { InjectionKey } from 'vue'

export const FOXY_FORM_KEY: InjectionKey<IFormProvide> = Symbol.for('foxy:form')