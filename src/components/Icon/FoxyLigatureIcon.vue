<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles">
    {{ icon }}
  </component>
</template>

<script lang="ts" setup>
  import { useProps } from "@foxy/composables"
  import { computed, StyleValue } from 'vue'

  import { IIconComponentProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IIconComponentProps>(), { tag: 'div' })

  const {filterProps} = useProps<IIconComponentProps>(props)

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const iconClasses = computed(() => {
    return [
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>
