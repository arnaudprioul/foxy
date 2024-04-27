import { DeepReadonly, Ref } from 'vue'

export interface IResizeState {
  resizeRef: Ref<HTMLElement | undefined>
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}