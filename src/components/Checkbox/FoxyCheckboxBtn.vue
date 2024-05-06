<template>
  <foxy-selection-control
      v-bind="controlProps"
      v-model="model"
      :class="checkboxBtnClasses"
      :style="checkboxBtnStyles"
      type="checkbox"
      @update:model-value="handleChange"
      :false-icon="falseIcon"
      :true-icon="trueIcon"
      :aria-checked="indeterminate ? 'mixed' : undefined"
      />
</template>

<script lang="ts" setup>
  import { SELECTION_CONTROL_PROPS } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { ICheckboxBtnProps } from '@foxy/interfaces'

  import { keys, omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ICheckboxBtnProps>(), { density: DENSITY.DEFAULT })

  const emits = defineEmits(['update:modelValue', 'update:focused'])

  const indeterminate = useProxiedModel(props, 'indeterminate')
  const model = useProxiedModel(props, 'modelValue')

  const handleChange = (v: any) => {
    if (indeterminate.value) {
      indeterminate.value = false
    }
  }

  const falseIcon = computed(() => {
    return indeterminate.value
        ? props.indeterminateIcon
        : props.falseIcon
  })
  const trueIcon = computed(() => {
    return indeterminate.value
        ? props.indeterminateIcon
        : props.trueIcon
  })

  const controlProps = omit(pick(props, keys(SELECTION_CONTROL_PROPS)), ['modelValue', 'falseIcon', 'trueIcon'])

  // CLASS & STYLES

  const checkboxBtnStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const checkboxBtnClasses = computed(() => {
    return [
      'foxy-checkbox-btn',
      props.class,
    ]
  })
</script>
