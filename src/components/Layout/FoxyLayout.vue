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

  const { layoutClasses, layoutRef, getLayoutItem, items } = useCreateLayout(props)

  const layStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const layClasses = computed(() => {
    return [layoutClasses.value, props.class]
  })

  defineExpose({ getLayoutItem, items })
</script>

<style lang="scss" scoped>
  .foxy-layout {
    &__wrapper {
      width: 100vw;
      height: 100vh;
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>

<style>
  :root {

  }

  * {
    box-sizing: border-box;
  }
</style>