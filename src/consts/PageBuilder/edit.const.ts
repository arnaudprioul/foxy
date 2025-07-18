import type { TEditorProvide } from '@foxy/types'

import type { InjectionKey } from 'vue'
import { ref, shallowRef } from 'vue'

export const FOXY_EDIT_KEY: InjectionKey<TEditorProvide> = Symbol.for('foxy:editor')

export const EMPTY_EDIT: TEditorProvide = {
    id: shallowRef(),
    root: {
        parents: ref(new Map()),
        children: ref(new Map()),
        edit: ref(new Set()),
        lock: ref(new Set())
    }
}
