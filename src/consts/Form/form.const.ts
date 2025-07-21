import type { IFormProvide } from '@/interfaces'
import type { InjectionKey } from 'vue'

export const ORIGAM_FORM_KEY: InjectionKey<IFormProvide> = Symbol.for('origam:form')
