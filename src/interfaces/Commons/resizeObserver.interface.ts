import { TTemplateRef } from "@foxy/types"
import { DeepReadonly, Ref } from 'vue'

export interface IResizeState {
  resizeRef: TTemplateRef
  contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}
