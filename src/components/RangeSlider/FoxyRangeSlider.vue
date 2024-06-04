<template>
  <foxy-input
      ref="foxyInputRef"
      :class="rangeSliderClasses"
      :focused="isFocused"
      :style="rangeSliderStyles"
      v-bind="{ ...inputProps}">
    <template v-if="hasPrepend" #prepend>
      <slot name="prepend"/>
    </template>

    <template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
        <div class="foxy-range-slider__label">
          <slot name="label">
            <foxy-label :for="id" :required="required" :text="label"/>
          </slot>
        </div>

        <div
            class="foxy-range-slider__container"
            @mousedown="handleSliderMousedown"
            @touchstartPassive="handleSliderTouchstart">

          <input
              :id="id"
              :disabled="isDisabled"
              :name="name || id"
              :readonly="isReadonly"
              :value="model"
              tabindex="-1"
          />

          <foxy-range-slider-track
              ref="foxyRangeSliderTrackRef"
              :start="0"
              :stop="trackStop"
              class="foxy-range-slider__track"
              v-bind="{...trackProps}"/>

          <foxy-range-slider-thumb
              ref="foxyRangeSliderThumbRef"
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

    <template v-if="hasSlot('append')" #append>
      <slot name="append"/>
    </template>

    <template v-if="hasSlot('details')" #details="detailsSlotProps">
      <slot name="details" v-bind="detailsSlotProps"/>
    </template>

    <template v-if="hasSlot('messages')" #messages="{hasMessages, messages}">
      <slot name="messages" v-bind="{hasMessages, messages}"/>
    </template>

    <template v-if="hasSlot('message')" #message="{message}">
      <slot name="message" v-bind="{message}"/>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyInput, FoxyLabel, FoxyRangeSliderThumb, FoxyRangeSliderTrack } from '@foxy/components'

  import { useFocus, useRangeSlider, useSlots, useSteps } from '@foxy/composables'

  import { INPUT_PROPS } from '@foxy/consts'

  import { DENSITY, DIRECTION } from '@foxy/enums'

  import { IRangeSliderProps } from '@foxy/interfaces'

  import { TFoxyInput, TFoxyRangeSliderThumb, TFoxyRangeSliderTrack } from '@foxy/types'

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

  const foxyInputRef = ref<TFoxyInput>()
  const foxyRangeSliderThumbRef = ref<TFoxyRangeSliderThumb>()
  const foxyRangeSliderTrackRef = ref<TFoxyRangeSliderTrack>()

  const { hasSlot } = useSlots()

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
    position,
    hasLabels
  } = useRangeSlider({
    foxyRangeSliderTrackRef,
    foxyRangeSliderThumbRef,
    props,
    steps,
    onSliderStart: ({ value }) => {
      console.log('start', value)

      const roundedValue = roundValue(value)

      model.value = roundedValue

      emits('start', roundedValue)
    },
    onSliderEnd: ({ value }) => {
      console.log('end', value)

      const roundedValue = roundValue(value)

      model.value = roundedValue

      emits('end', roundedValue)
    },
    onSliderMove: ({ value }) => {
      console.log('onSliderMove', roundValue(value))

      model.value = roundValue(value)
    },
    getActiveThumb: () => {
      return foxyRangeSliderThumbRef.value?.$el
    }
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
        'foxy-range-slider--inset': props.inset,
      },
      props.class
    ]
  })

  defineExpose({})
</script>

<style lang="scss" scoped>
  .foxy-range-slider {
    $this: &;

    &__container {
      position: relative;
      min-height: inherit;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      input {
        cursor: default;
        padding: 0;
        width: 100%;
        display: none;
      }
    }

    &__label {
      margin-inline-end: 12px;
    }

    &.foxy-input {
      :deep(.foxy-input__append),
      :deep(.foxy-input__prepend) {
        padding: 0;
      }

      &--disabled {
        pointer-events: none;

        #{$this}__container {
          opacity: 0.38;
        }
      }

      &--error {
        --foxy-range-slider__track---color: var(--foxy-range-slider--error__track---color, inherit);

        :not(.foxy-input--disabled) {
          --foxy-range-slider__track---background-color: var(--foxy-range-slider--error__track---background-color, currentColor);

          #{$this}__container {
            color: rgba(255, 0, 0, 1);
          }
        }
      }

      &--horizontal {
        align-items: center;
        margin-inline: 8px 8px;

        :deep(.foxy-input__control) {
          min-height: 32px;
          display: flex;
          align-items: center;
        }

        :deep(.foxy-range-slider-track) {
          display: flex;
          align-items: center;
          width: 100%;
          touch-action: pan-y;
          font-size: 0.5rem;
          padding: 0 5px;
          background-color: rgb(148, 148, 148);
          height: 14px;
          cursor: pointer;
          transition: 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);

          .foxy-range-slider-track__background {
            height: 14px;
          }

          .foxy-range-slider-track__fill {
            height: inherit;
          }

          .foxy-range-slider-track__tick {
            margin-top: calc(calc(14px + 2px) / 2);
          }

          .foxy-range-slider-track__tick-label {
            margin-top: calc(14px / 2 + 8px);
            transform: translateX(-50%);
          }

          .foxy-range-slider-track__tick--first {
            margin-inline-start: calc(14px + 1px);
            transform: translateX(0%);
          }

          .foxy-range-slider-track__tick--last {
            margin-inline-start: calc(100% - 14px - 1px);
            transform: translateX(-100%);
          }
        }

        :deep(.foxy-range-slider-thumb) {
          top: 50%;
          transform: translateY(-50%);
          inset-inline-start: calc(var(--foxy-range-slider-thumb---position) - var(--foxy-range-slider-thumb---size, 20) / 2);

          .foxy-range-slider-thumb__label-container {
            left: calc(var(--foxy-range-slider-thumb---size, 4) / 2);
            top: 0;
          }

          .foxy-range-slider-thumb__label {
            bottom: calc(var(--foxy-range-slider-thumb---size, 4) / 2);
            transform: translateX(-50%);

            &:before {
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid currentColor;
              bottom: -6px;
            }
          }
        }
      }

      &--vertical {
        justify-content: center;
        margin-top: 12px;
        margin-bottom: 12px;

        :deep(.foxy-input__control) {
          min-height: 300px;
        }

        :deep(.foxy-range-slider-track) {
          height: 100%;
          display: flex;
          justify-content: center;
          width: calc(var(--foxy-range-slider-track---size, 2) + 2px);
          touch-action: pan-x;

          .foxy-range-slider-track__background {
            width: var(--foxy-range-slider-track---size, 2);
          }

          .foxy-range-slider-track__fill {
            width: inherit;
          }

          .foxy-range-slider-track__ticks {
            height: 100%;
          }

          .foxy-range-slider-track__tick {
            margin-inline-start: calc(calc(var(--foxy-range-slider-track---size) + 2px) / 2);
            transform: translate(calc(var(--foxy-range-slider-track---size, 2) / -2), calc(var(--foxy-range-slider-track---size, 2) / 2));
          }

          .foxy-range-slider-track__tick--first {
            bottom: calc(0% + var(--foxy-range-slider-track---size, 2) + 1px);
          }

          .foxy-range-slider-track__tick--last {
            bottom: calc(100% - var(--foxy-range-slider-track---size, 2) - 1px);
          }

          .foxy-range-slider-track__tick-label {
            margin-inline-start: calc(var(--foxy-range-slider-track---size, 2) / 2 + 12px);
            transform: translateY(-50%);
          }
        }

        :deep(.foxy-range-slider-thumb) {
          top: calc(var(--foxy-range-slider-thumb---position) - var(--foxy-range-slider-thumb---size, 4) / 2);

          .foxy-range-slider-thumb__label-container {
            top: calc(var(--foxy-range-slider-thumb---size, 4) / 2);
            right: 0;
          }

          .foxy-range-slider-thumb__label {
            top: -12.5px;
            left: calc(var(--foxy-range-slider-thumb---size, 4) / 2);

            &:before {
              border-right: 6px solid currentColor;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              left: -6px;
            }
          }
        }
      }
    }

    &--has-labels {
      > :deep(.foxy-input__control) {
        margin-bottom: 4px;
      }
    }

    &--pressed {
      --foxy-range-slider---transition: var(--foxy-range-slider--pressed---transition, none);
    }

    &--focused {
      :deep(.foxy-range-slider-track) {
        .foxy-range-slider-track__tick {
          opacity: 1;
        }
      }
    }
  }
</style>

<style>
  :root {

  }
</style>
