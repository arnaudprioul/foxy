<template>
  <div :class="editWrapperClasses" :style="editWrapperStyles">
    <div class="foxy-edit-wrapper__wrapper">
      <slot name="default"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from '@foxy/composables'

  import { IAutoPropComponentDefinition, IEditWrapperProps } from '@foxy/interfaces'

  import { scanForAutoProps } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IEditWrapperProps>(), { slotName: 'default', autoDetectProps: true })

  const { hasSlot, slots } = useSlots()

  const vnodes = hasSlot(props.slotName) ? slots[props.slotName]() : undefined

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
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>

</style>

<style>
  :root {

  }
</style>
