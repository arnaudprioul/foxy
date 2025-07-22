import type { InjectionKey } from 'vue'
import { ref, shallowRef } from 'vue'
import type { TEditorProvide } from '../../types'

export const ORIGAM_EDIT_KEY: InjectionKey<TEditorProvide> = Symbol.for('origam:editor')

export const EMPTY_EDIT: TEditorProvide = {
    id: shallowRef(),
    root: {
        parents: ref(new Map()),
        children: ref(new Map()),
        edit: ref(new Set()),
        lock: ref(new Set())
    }
}
