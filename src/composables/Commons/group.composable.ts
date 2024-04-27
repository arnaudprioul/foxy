import { IGroupItemProps, IGroupItemProvide, IGroupProvide } from '@foxy/interfaces'

import { getCurrentInstance, getUid } from '@foxy/utils'

import { computed, inject, InjectionKey, onBeforeUnmount, provide, toRef, watch } from 'vue'

export function useGroupItem (
    props: IGroupItemProps,
    injectKey: InjectionKey<IGroupProvide>,
    required = true,
): IGroupItemProvide | null {
  const vm = getCurrentInstance('useGroupItem')

  if (!vm) {
    throw new Error(
        '[Foxy] useGroupItem composable must be used inside a component setup function'
    )
  }

  const id = getUid()

  provide(Symbol.for(`${injectKey.description}:id`), id)

  const group = inject(injectKey, null)

  if (!group) {
    if (!required) return group

    throw new Error(`[Foxy] Could not find useGroup injection with symbol ${injectKey.description}`)
  }

  const value = toRef(props, 'value')
  const disabled = computed(() => !!(group.disabled.value || props.disabled))

  group.register({
    id,
    value,
    disabled,
  }, vm)

  onBeforeUnmount(() => {
    group.unregister(id)
  })

  const isSelected = computed(() => {
    return group.isSelected(id)
  })

  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass])

  watch(isSelected, (value) => {
    vm.emit('group:selected', { value })
  })

  return {
    id,
    isSelected,
    toggle: () => group.select(id, !isSelected.value),
    select: (value: boolean) => group.select(id, value),
    selectedClass,
    value,
    disabled,
    group,
  }
}
