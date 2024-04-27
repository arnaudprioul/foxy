<template>
  <div
      ref="layoutRef"
      :class="layClasses"
      :style="layStyles">
    <div class="foxy-layout__wrapper">
      <slot name="default"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  import { useCreateLayout } from '@foxy/composables'

  import { ILayoutProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ILayoutProps>(), {})

  const { layoutClasses, layoutRef } = useCreateLayout(props)

  const layStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const layClasses = computed(() => {
    return [layoutClasses.value, props.class]
  })
</script>
