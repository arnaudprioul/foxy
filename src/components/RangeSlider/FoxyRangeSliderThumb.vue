<template>
  <div
      :aria-orientation="direction"
      :aria-readonly="!!readonly"
      :aria-valuemax="max"
      :aria-valuemin="min"
      :aria-valuenow="modelValue"
      :class="rangeSliderThumbClasses"
      :style="rangeSliderThumbStyles"
      :tabindex="isDisabled ? -1 : 0"
      role="slider"
      @keydown="!isReadonly ? handleKeydown : undefined">
    <div
        :class="rangeSliderThumbSurfaceClasses"
        :style="rangeSliderThumbSurfaceStyles"
    />

    <div
        v-ripple="rippleProps"
        :style="rangeSliderThumbRippleStyles"
        class="foxy-range-slider-thumb__ripple"
    />

    <foxy-translate-scale origin="bottom center">
      <div v-show="showLabel"
           class="foxy-range-slider-thumb__label-container">
        <div class="foxy-range-slider-thumb__label">
          <slot name="default" v-bind="{ modelValue: props.modelValue }">
            <span>{{ label }}</span>
          </slot>
        </div>
      </div>
    </foxy-translate-scale>
  </div>
</template>

<script lang="ts" setup>
  import { FoxyTranslateScale } from '@foxy/components'

  import { useBorder, useElevation, useRounded, useTextColor } from '@foxy/composables'

  import { FOXY_RANGE_SLIDER_KEY } from '@foxy/consts'

  import { vRipple } from '@foxy/directives'

  import { KEYBOARD_VALUES } from '@foxy/enums'

  import { IRangeSliderThumbProps } from '@foxy/interfaces'

  import { clamp, convertToUnit } from '@foxy/utils'

  import { computed, inject, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IRangeSliderThumbProps>(), {
    ripple: true,
    size: 20,
    min: 0,
    max: 100,
    modelValue: 0,
    position: 0
  })

  const emits = defineEmits(['update:modelValue'])

  const slider = inject(FOXY_RANGE_SLIDER_KEY)

  if (!slider) throw new Error('[Foxy] range-slider-thumb must be used inside range-slider')

  const {
    step,
    error,
    color: sliderColor,
    elevation: sliderElevation,
    rounded: sliderRounded,
    border: sliderBorder,
    ripple: sliderRipple,
    disabled,
    readonly,
    isReversed,
    isVertical,
    mousePressed,
    decimals,
    indexFromEnd,
  } = slider

  const isDisabled = computed(() => {
    return props.disabled ?? disabled.value
  })
  const isReadonly = computed(() => {
    return props.readonly ?? readonly.value
  })
  const color = computed(() => {
    return error || isDisabled.value ? undefined : sliderColor.value ?? props.color
  })
  const size = computed(() => {
    if (typeof props?.size === 'number') {
      return parseInt(props.size, 10)
    }

    return 20
  })
  const positionPercentage = computed(() => {
    return convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, '%')
  })

  const elevationProps = computed(() => {
    return !isDisabled.value ? props.elevation ?? sliderElevation.value : undefined
  })
  const roundedProps = computed(() => {
    return props.rounded ?? sliderRounded.value
  })
  const borderProps = computed(() => {
    return props.border ?? sliderBorder.value
  })
  const rippleProps = computed(() => {
    return !isDisabled.value && !isReadonly.value ? [(props.ripple || sliderRipple), null, [
      'circle', 'center']] : undefined
  })

  const { elevationClasses } = useElevation(elevationProps)
  const { borderClasses, borderStyles } = useBorder(borderProps)
  const { roundedClasses, roundedStyles } = useRounded(roundedProps)

  const { textColorStyles } = useTextColor(color)

  const relevantKeys = [KEYBOARD_VALUES.PAGEUP, KEYBOARD_VALUES.PAGEDOWN, KEYBOARD_VALUES.END, KEYBOARD_VALUES.HOME, KEYBOARD_VALUES.LEFT, KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP]

  const multipliers = computed(() => {
    if (step.value) return [1, 2, 3]
    else return [1, 5, 10]
  })

  const parseKeydown = (e: KeyboardEvent, value: number) => {
    if (!relevantKeys.includes(e.key)) return

    e.preventDefault()

    const _step = step.value || 0.1
    const steps = (props.max - props.min) / _step
    if ([KEYBOARD_VALUES.LEFT, KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP].includes(e.key)) {
      const increase = isVertical.value
          ? [KEYBOARD_VALUES.RIGHT, isReversed.value ? KEYBOARD_VALUES.DOWN : KEYBOARD_VALUES.UP]
          : [KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.UP]
      const direction = increase.includes(e.key) ? 1 : -1
      const multiplier = e.shiftKey ? 2 : (e.ctrlKey ? 1 : 0)

      value = value + (direction * _step * multipliers.value[multiplier])
    } else if (e.key === KEYBOARD_VALUES.HOME) {
      value = props.min
    } else if (e.key === KEYBOARD_VALUES.END) {
      value = props.max
    } else {
      const direction = e.key === KEYBOARD_VALUES.PAGEDOWN ? 1 : -1
      value = value - (direction * _step * (steps > 100 ? steps / 10 : 10))
    }

    return clamp(value, props.min, props.max)
  }
  const handleKeydown = (e: KeyboardEvent) => {
    const newValue = parseKeydown(e, props.modelValue)

    newValue != null && emits('update:modelValue', newValue)
  }

  const showLabel = computed(() => {
    return (props.label && props.focused) || props.label === 'always'
  })
  const label = computed(() => {
    return props.modelValue.toFixed(step.value ? decimals.value : 1)
  })

  // CLASS & STYLES

  const rangeSliderThumbStyles = computed(() => {
    return [
      {
        '--foxy-range-slider-thumb---position': positionPercentage,
        '--foxy-range-slider-thumb---size': convertToUnit(size.value),
      },
      props.style
    ] as StyleValue
  })
  const rangeSliderThumbClasses = computed(() => {
    return [
      'foxy-range-slider-thumb',
      {
        'foxy-range-slider-thumb--focused': props.focused,
        'foxy-range-slider-thumb--pressed': props.focused && mousePressed.value,
      },
      props.class
    ]
  })
  const rangeSliderThumbSurfaceStyles = computed(() => {
    return [
      borderStyles.value,
      roundedStyles.value,
      textColorStyles.value,
      props.style
    ] as StyleValue
  })
  const rangeSliderThumbSurfaceClasses = computed(() => {
    return [
      'foxy-range-slider-thumb__surface',
      elevationClasses.value,
      borderClasses.value,
      roundedClasses.value,
    ]
  })
  const rangeSliderThumbRippleStyles = computed(() => {
    return [
      textColorStyles.value,
      props.style
    ] as StyleValue
  })
</script>
