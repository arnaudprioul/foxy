<template>
  <div
      ref="layoutRef"
      :id="layoutId"
      :class="layClasses"
      :style="layStyles">
    <div :id="`${layoutId}-wrapper`" class="foxy-layout__wrapper">
      <slot name="default"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  import { useCreateLayout, useProps } from '@foxy/composables'

  import { ILayoutProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ILayoutProps>(), {})

  const {filterProps} = useProps<ILayoutProps>(props)

  const { layoutClasses, layoutRef, getLayoutItem, items, layoutId } = useCreateLayout(props)

  const layStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const layClasses = computed(() => {
    return [layoutClasses.value, props.class]
  })

  defineExpose({
	  getLayoutItem,
	  items,
	  filterProps
	})
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
