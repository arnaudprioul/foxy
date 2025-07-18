import type { IFormProvide } from '@foxui/interfaces'
import type { InjectionKey } from 'vue'

export const FOXUI_FORM_KEY: InjectionKey<IFormProvide> = Symbol.for('foxui:form')
