<template>
  <foxy-input
      :class="rangeSliderClasses"
      :focused="isFocused"
      :style="rangeSliderStyles"
      v-bind="{ ...inputProps}">
    <template v-if="hasPrepend" #prepend>
      <slot name="prepend">

      </slot>
    </template>

    <template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
        <div
            class="foxy-range-slider__container"
            @mousedown="isReadonly ? handleSliderMousedown : undefined"
            @touchstartPassive="isReadonly ? handleSliderTouchstart : undefined"
        >
          <input
              :id="id"
              :disabled="isDisabled"
              :name="name || id"
              :readonly="isReadonly"
              :value="model"
              tabindex="-1"
          />

          <foxy-range-slider-track
              ref="trackContainerRef"
              :start="0"
              :stop="trackStop"
              class="foxy-range-slider__track"
              v-bind="{...trackProps}"/>

          <foxy-range-slider-thumb
              ref="thumbContainerRef"
              :aria-describedby="messagesId"
              :focused="isFocused"
              :max="max"
              :min="min"
              :model-value="model"
              :position="trackStop"
              class="foxy-range-slider__thumb"
              v-bind="{...thumbProps}"
              @blur="handleBlur"
              @focus="handleFocus"
              @update:model-value="handleUpdateModelValue">
            <template v-if="hasSlot('thumbLabel')" #default>
              <slot name="thumbLabel"/>
            </template>
          </foxy-range-slider-thumb>
        </div>
      </slot>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyInput, FoxyRangeSliderThumb } from '@foxy/components'

  import { useFocus, useRangeSlider, useSlots, useSteps } from '@foxy/composables'

  import { INPUT_PROPS } from '@foxy/consts'

  import { DENSITY, DIRECTION } from '@foxy/enums'

  import { IRangeSliderProps } from '@foxy/interfaces'

  import { keys, omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, ref, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IRangeSliderProps>(), {
    min: 0,
    max: 100,
    modelValue: 0,
    step: 0,
    direction: DIRECTION.HORIZONTAL,
    density: DENSITY.DEFAULT
  })

  const emits = defineEmits(['update:focused', 'update:modelValue', 'start', 'end'])

  const { hasSlot } = useSlots()

  const thumbContainerRef = ref()

  const steps = useSteps(props)
  const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      value => {
        return steps.roundValue(value == null ? steps.min.value : value)
      },
  )
  const {
    min,
    max,
    mousePressed,
    roundValue,
    onSliderMousedown: handleSliderMousedown,
    onSliderTouchstart: handleSliderTouchstart,
    trackContainerRef,
    position,
    hasLabels
  } = useRangeSlider({
    props,
    steps,
    onSliderStart: () => {
      emits('start', model.value)
    },
    onSliderEnd: ({ value }) => {
      const roundedValue = roundValue(value)

      model.value = roundedValue

      emits('end', roundedValue)
    },
    onSliderMove: ({ value }) => model.value = roundValue(value),
    getActiveThumb: () => thumbContainerRef.value?.$el,
  })

  const { isFocused, onFocus: handleFocus, onBlur: handleBlur } = useFocus(props)
  const trackStop = computed(() => {
    return position(model.value)
  })

  const handleUpdateModelValue = (v) => {
    model.value = v
  }

  const inputProps = computed(() => {
    return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'class', 'focused', 'centerAffix'])
  })
  const thumbProps = computed(() => {
    return omit(props.thumbProps ?? {}, ['modelValue', 'class', 'focused', 'min', 'max', 'position'])
  })
  const trackProps = computed(() => {
    return omit(props.trackProps ?? {}, ['class', 'start', 'stop'])
  })

  const hasPrepend = computed(() => {
    return !!(props.label) || hasSlot('label') || hasSlot('prepend')
  })

  // CLASS & STYLES

  const rangeSliderStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const rangeSliderClasses = computed(() => {
    return [
      'foxy-range-slider',
      {
        'foxy-range-slider--has-labels': hasSlot('tickLabel') || hasLabels.value,
        'foxy-range-slider--focused': isFocused.value,
        'foxy-range-slider--pressed': mousePressed.value,
        'foxy-range-slider--disabled': props.disabled,
      },
      props.class
    ]
  })
</script>
