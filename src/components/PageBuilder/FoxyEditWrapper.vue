<template>
  <div
      :class="editWrapperClasses"
      :style="editWrapperStyles"
  >
    <div class="foxy-edit-wrapper__wrapper">
      <slot name="default"/>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { useProps } from '@foxy/composables'

  import { IAutoPropComponentDefinition, IEditWrapperProps } from '@foxy/interfaces'

  import { scanForAutoProps } from '@foxy/utils'

  import { computed, StyleValue, useSlots } from 'vue'

  // TODO - WIP

  const props = withDefaults(defineProps<IEditWrapperProps>(), { slotName: 'default', autoDetectProps: true })

  const { filterProps } = useProps<IEditWrapperProps>(props)

  const slots = useSlots()

  const vnodes = slots[props.slotName] ? slots[props.slotName]() : undefined

  if (slots[props.slotName] && props.autoDetectProps && vnodes) {
    const propsTypes: Array<IAutoPropComponentDefinition> = scanForAutoProps(vnodes)
  }

  // CLASS & STYLES

  const editWrapperStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const editWrapperClasses = computed(() => {
    return [
      'foxy-edit-wrapper',
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })

</script>

<style
    lang="scss"
    scoped
>

</style>

<style>
:root {

}
</style>
