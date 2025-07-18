import type { TEditorProvide } from '@foxui/types'

import type { InjectionKey } from 'vue'
import { ref, shallowRef } from 'vue'

export const FOXUI_EDIT_KEY: InjectionKey<TEditorProvide> = Symbol.for('foxui:editor')

export const EMPTY_EDIT: TEditorProvide = {
    id: shallowRef(),
    root: {
        parents: ref(new Map()),
        children: ref(new Map()),
        edit: ref(new Set()),
        lock: ref(new Set())
    }
}
