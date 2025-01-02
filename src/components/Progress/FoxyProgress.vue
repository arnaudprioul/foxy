<template>
  <component
		  ref="foxyProgressRef"
      :is="progressComponent"
      :aria-hidden="!props.active"
      :aria-valuemax="max"
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

  import { useProgress, useProps, useSize } from '@foxy/composables'

  import { PROGRESS_TYPE, SIZES } from '@foxy/enums'

  import { IProgressProps } from '@foxy/interfaces'
  import { TFoxyProgressCircular, TFoxyProgressLinear } from "@foxy/types"

  import { keys, pick } from '@foxy/utils'

  import { computed, ref, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IProgressProps>(), {
    tag: 'div',
    modelValue: 0,
    max: 100,
    thickness: 4,
    size: SIZES.DEFAULT
  })

  const {filterProps} = useProps<IProgressProps>(props)

  const foxyProgressRef = ref<TFoxyProgressCircular | TFoxyProgressLinear>()

  const { sizeClasses, sizeStyles } = useSize(props)
  const { normalizedValue, hasContent } = useProgress(props)

  const isCircular = computed(() => {
    return props.type === PROGRESS_TYPE.CIRCULAR
  })
  const progressComponent = computed(() => {
    return isCircular.value ? FoxyProgressCircular : FoxyProgressLinear
  })
  const progressProps = computed(() => {
    return foxyProgressRef.value?.filterProps(props)
  })

  // CLASS & STYLES

  const progressStyles = computed(() => {
    return [
      sizeStyles.value,
      props.style
    ] as StyleValue
  })
  const progressClasses = computed(() => {
    return [
      sizeClasses.value,
      props.class,
    ]
  })

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>
