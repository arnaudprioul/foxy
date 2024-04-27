import { computed, Ref, shallowRef, watch } from 'vue'

export function useLazy (props: { eager: boolean }, active: Ref<boolean>) {
  const isBooted = shallowRef(false)
  const hasContent = computed(() => isBooted.value || props.eager || active.value)

  watch(active, () => isBooted.value = true)

  const handleAfterLeave = () => {
    if (!props.eager) isBooted.value = false
  }

  return { isBooted, hasContent, handleAfterLeave }
}