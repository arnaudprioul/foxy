<template>
  <div
      :class="rangeSliderTrackClasses"
      :style="rangeSliderTrackStyles">
    <div
        :class="rangeSliderTrackBgClasses"
        :style="rangeSliderTrackBgStyles"/>

    <div
        :class="rangeSliderTrackFillClasses"
        :style="rangeSliderTrackFillStyles"/>

    <div v-if="showTicks" :class="rangeSliderTrackTicksClasses">
      <template v-for="(tick, index) in ticks" :key="index">
        <div
            :class="rangeSliderTickClasses"
            :style="rangeSliderTickStyles">
          <div
              v-if="tick.label || hasSlot('item') || hasSlot(`item-${index}`)"
              class="foxy-range-slider-track__tick-label">
            <slot name="item" v-bind="{ tick, index }">
              <slot :name="`item-${index}`" v-bind="{ tick, index }">
                {{ tick.label }}
              </slot>
            </slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useBackgroundColor, useRounded, useSlots } from '@foxy/composables'

  import { FOXY_RANGE_SLIDER_KEY } from '@foxy/consts'

  import { IRangeSliderTrackProps } from '@foxy/interfaces'

  import { TTick } from '@foxy/types'

  import { convertToUnit } from '@foxy/utils'

  import { computed, inject, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IRangeSliderTrackProps>(), {
    start: 0,
    stop: 100,
    size: 4
  })

  const slider = inject(FOXY_RANGE_SLIDER_KEY)

  if (!slider) throw new Error('[Foxy] range-slider-track must be inside range-slider')

  const { hasSlot } = useSlots()

  const {
    color: sliderColor,
    bgColor: sliderBgColor,
    error,
    disabled,
    rounded: sliderRounded,
    showTicks: sliderShowTicks,
    parsedTicks,
    min,
    max,
    isVertical,
    indexFromEnd,
  } = slider

  const isDisabled = computed(() => {
    return props.disabled ?? disabled.value
  })
  const color = computed(() => {
    return error || isDisabled.value ? undefined : sliderColor.value ?? props.color
  })
  const bgColor = computed(() => {
    return error || isDisabled.value ? undefined : sliderBgColor.value ?? props.bgColor
  })
  const size = computed(() => {
    if (typeof props?.size === 'number') {
      return parseInt(props.size, 10)
    }

    return 4
  })

  const showTicks = computed(() => {
    return !!sliderShowTicks.value
  })

  const roundedProps = computed(() => {
    return props.rounded ?? sliderRounded.value
  })

  const { roundedClasses, roundedStyles } = useRounded(roundedProps)
  const { backgroundColorStyles: trackFillColorStyles, } = useBackgroundColor(bgColor)
  const { backgroundColorStyles } = useBackgroundColor(color)

  const startDir = computed(() => `inset-${isVertical.value ? 'block' : 'inline'}-${indexFromEnd.value ? 'end' : 'start'}`)
  const endDir = computed(() => isVertical.value ? 'height' : 'width')

  const backgroundStyles = computed(() => {
    return {
      [startDir.value]: '0%',
      [endDir.value]: '100%',
    }
  })
  const trackFillWidth = computed(() => {
    return props.stop - props.start
  })

  const trackFillStyles = computed(() => {
    return {
      [startDir.value]: convertToUnit(props.start, '%'),
      [endDir.value]: convertToUnit(trackFillWidth.value, '%'),
    }
  })

  const ticks = computed(() => {
    return isVertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value
  })

  const rangeSliderTickStyles = (tick: TTick) => {
    const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined

    return [
      {
        '--foxy-range-slider-track__tick---size': convertToUnit(size.value),
        [startDir.value]: directionValue
      },
      props.style
    ] as StyleValue
  }
  const rangeSliderTickClasses = (tick: TTick) => {
    return [
      'foxy-range-slider-track__tick',
      {
        'foxy-range-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
        'foxy-range-slider-track__tick--first': tick.value === min.value,
        'foxy-range-slider-track__tick--last': tick.value === max.value,
      },
    ]
  }

  // CLASS & STYLES

  const rangeSliderTrackStyles = computed(() => {
    return [
      {
        '--foxy-range-slider-track---size': convertToUnit(size.value),
      },
      roundedStyles.value,
      props.style
    ] as StyleValue
  })
  const rangeSliderTrackClasses = computed(() => {
    return [
      'foxy-range-slider-track',
      roundedClasses.value,
      props.class,
    ]
  })
  const rangeSliderTrackBgStyles = computed(() => {
    return [
      backgroundStyles.value,
      backgroundColorStyles.value,
    ] as StyleValue
  })
  const rangeSliderTrackBgClasses = computed(() => {
    return [
      'foxy-range-slider-track__background',
      {
        'foxy-range-slider-track__background--opacity': !!color.value,
      },
    ]
  })
  const rangeSliderTrackFillStyles = computed(() => {
    return [
      trackFillStyles.value,
      trackFillColorStyles.value,
    ] as StyleValue
  })
  const rangeSliderTrackFillClasses = computed(() => {
    return [
      'foxy-range-slider-track__fill'
    ]
  })
  const rangeSliderTrackTicksClasses = computed(() => {
    return [
      'foxy-range-slider-track__ticks',
      {
        'foxy-range-slider-track__ticks--always-show': sliderShowTicks.value === 'always',
      },
    ]
  })
</script>
