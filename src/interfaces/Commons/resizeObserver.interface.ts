import { TTemplateRef } from "@foxy/types"
import { DeepReadonly, Ref } from 'vue'

export interface IResizeState {
  resizeRef: Ref
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}
