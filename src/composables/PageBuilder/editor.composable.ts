import { useProxiedModel } from '@foxy/composables'
import { EMPTY_EDIT, FOXY_EDIT_KEY } from '@foxy/consts'

import { TEditorProvide } from '@foxy/types'

import { getCurrentInstanceName, getUid } from '@foxy/utils'

import { computed, inject, provide, ref } from 'vue'

export function useCreateEditor (props: any, name = getCurrentInstanceName()) {

  const children = ref(new Map<unknown, Array<unknown>>())
  const parents = ref(new Map<unknown, unknown>())

  const edit = useProxiedModel(props, 'edit', props.edit, v => new Set(v), v => [...v.values()])
  const lock = useProxiedModel(props, 'lock', props.lock, v => new Set(v), v => [...v.values()])

  const editor: TEditorProvide = {
    id: ref(name),
    root: {
      edit,
      lock,
      children,
      parents
    }
  }

  provide(FOXY_EDIT_KEY, editor)

  return editor.root
}

export function useEditor (props: any) {
  const parent = inject(FOXY_EDIT_KEY, EMPTY_EDIT)

  const uidSymbol = Symbol(getUid())
  const computedId = computed(() => uidSymbol)

  const item = {
    ...parent,
    id: computedId,
    props,
    isEdited: computed(() => parent.root.edit.value.has(computedId.value)),
    isLocked: computed(() => parent.root.lock.value.has(computedId.value)),
  }

  return item
}