<template>
  <component
      :is="progressComponent"
      :aria-valuemax="max"
      :aria-hidden="!props.active"
      :aria-valuenow="indeterminate ? undefined : normalizedValue"
      :class="progressClasses"
      :style="progressStyles"
      aria-valuemin="0"
      role="progressbar"
      v-bind="progressProps">
    <template v-if="hasContent" #default>
      <slot name="default"/>
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyProgressCircular, FoxyProgressLinear } from '@foxy/components'

  import {
    useBothColor,
    useProgress,
    useSize
  } from '@foxy/composables'

  import { PROGRESS_TYPE, SIZES } from '@foxy/enums'

  import { IProgressProps } from '@foxy/interfaces'

  import { omit } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IProgressProps>(), { tag: 'div', modelValue: 0, max: 100, thickness: 4, size: SIZES.DEFAULT })

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { sizeClasses, sizeStyles } = useSize(props)
  const { normalizedValue, hasContent } = useProgress(props)

  const isCircular = computed(() => {
    return props.type === PROGRESS_TYPE.CIRCULAR
  })
  const progressComponent = computed(() => {
    return isCircular.value ? FoxyProgressCircular : FoxyProgressLinear
  })
  const progressProps = computed(() => {
    // TODO REFACTO TO USE CONSTANT PROPS
    return isCircular.value ? omit(props, ['type', 'bufferValue', 'clickable', 'reverse', 'stream']) : omit(props, ['type', 'rotate'])
  })

  // CLASS & STYLES

  const progressStyles = computed(() => {
    return [
      sizeStyles.value,
      colorStyles.value,
      props.style
    ] as StyleValue
  })
  const progressClasses = computed(() => {
    return [
      'foxy-progress',
      sizeClasses.value,
      props.class,
    ]
  })
</script>
