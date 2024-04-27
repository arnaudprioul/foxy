<template>
  <component
      :is="tag"
      :class="loaderClasses"
      :style="loaderStyles"
  >
    <template v-if="isLoading">
      <slot name="loader">
        <foxy-progress
            :color="color"
            :type="PROGRESS_TYPE.CIRCULAR"
            indeterminate
            :size="23"
            :width="2"/>
      </slot>
    </template>
    <template v-else>
      <slot name="default"/>
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyProgress } from '@foxy/components'

  import { PROGRESS_TYPE } from '@foxy/enums'

  import { ILoaderProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ILoaderProps>(), { tag: 'span' })

  const isLoading = computed(() => {
    return !!props.loading
  })

  // CLASS & STYLES

  const loaderStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const loaderClasses = computed(() => {
    return [
      'foxy-loader',
      props.class,
    ]
  })
</script>
