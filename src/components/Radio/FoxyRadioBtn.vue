<template>
  <foxy-selection-control
    v-model="model"
    :class="radioBtnClasses"
    :false-icon="falseIcon"
    :style="radioBtnStyles"
    :true-icon="trueIcon"
    type="radio"
    v-bind="controlProps"
    @click:label="handleClickLabel"
  >
    <template v-if="hasSlot('default')" #default>
      <slot name="default"/>
    </template>

    <template v-if="hasSlot('input')" #input="{props, icon, textColorStyles, backgroundColorStyles, model}">
      <slot name="input" v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"/>
    </template>

    <template v-if="hasSlot('label')" #label>
      <slot name="label"/>
    </template>
  </foxy-selection-control>
</template>

<script lang="ts" setup>
  import { FoxySelectionControl } from '@foxy/components'

  import { useSlots, useVModel } from '@foxy/composables'

  import { SELECTION_CONTROL_PROPS } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { IRadioBtnProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IRadioBtnProps>(), {
    density: DENSITY.DEFAULT,
    falseIcon: '$radioOff',
    trueIcon: '$radioOn'
  })

  const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

  const model = useVModel(props, 'modelValue')

  const { hasSlot } = useSlots()

  const handleClickLabel = (e: Event) => {
    emits('click:label', e)
  }

  const controlProps = computed(() => {
    return omit(pick(props, keys(SELECTION_CONTROL_PROPS)), ['modelValue', 'falseIcon', 'trueIcon', 'type'])
  })

  // CLASS & STYLES

  const radioBtnStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const radioBtnClasses = computed(() => {
    return [
      'foxy-radio-btn',
      props.class,
    ]
  })
</script>
