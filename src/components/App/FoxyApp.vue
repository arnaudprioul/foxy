<template>
  <foxy-layout
      ref="foxyAppRef"
      :id="id"
      :class="appClasses"
      :style="appStyles">
    <template #default>
      <slot name="default"/>
    </template>
  </foxy-layout>
</template>

<script lang="ts" setup>
  import { useProps } from "@foxy/composables"
  import { TFoxyApp } from "@foxy/types"
  import { computed, ref, StyleValue } from 'vue'

  import { ILayoutProps } from '@foxy/interfaces'

  import { FoxyLayout } from '@foxy/components'

  const props = withDefaults(defineProps<ILayoutProps>(), { fullHeight: true })

  const {filterProps} = useProps<ILayoutProps>(props)

  const foxyAppRef = ref<TFoxyApp>()

  // CLASSES & STYLES

  const appStyles = computed(() => {
    return [props.style] as StyleValue
  })
  const appClasses = computed(() => {
    return ['foxy-app', props.class]
  })

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>
