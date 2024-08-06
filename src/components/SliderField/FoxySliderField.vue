<template>
  <foxy-input
    ref="foxyInputRef"
    :class="sliderFieldClasses"
    :focused="isFocused"
    :style="sliderFieldStyles"
    v-bind="{ ...inputProps}">
    <template v-if="hasPrepend" #prepend>
      <slot name="prepend"/>
    </template>

    <template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
        <div class="foxy-slider-field__label">
          <slot name="label">
            <foxy-label :for="id" :required="required" :text="label"/>
          </slot>
        </div>

        <div
          class="foxy-slider-field__container"
          @mousedown="handleSliderMousedown"
          @touchstartPassive="handleSliderTouchstart">

          <foxy-slider-field-track
            ref="foxySliderFieldTrackRef"
            :start="0"
            :stop="trackStop"
            class="foxy-slider-field__track"
            v-bind="{...trackProps}"/>

          <template v-if="!isRange">
            <input
              :id="id"
              :disabled="isDisabled"
              :name="name || id"
              :readonly="isReadonly"
              :value="model"
              tabindex="-1"
            />

            <foxy-slider-field-thumb
              ref="foxySliderFieldThumbRef"
              :aria-describedby="messagesId"
              :focused="isFocused"
              :max="max"
              :min="min"
              :model-value="model"
              :position="trackStop"
              class="foxy-slider-field__thumb"
              v-bind="{...thumbProps}"
              @blur="handleBlur"
              @focus="handleFocus"
              @update:model-value="handleUpdateModelValue">
              <template v-if="hasSlot('thumb.label')" #default>
                <slot name="thumb.label"/>
              </template>
            </foxy-slider-field-thumb>
          </template>
          <template v-else>
            <input
              :id="`${id}__start`"
              :disabled="isDisabled"
              :name="name || id"
              :readonly="isReadonly"
              :value="model[0]"
              tabindex="-1"
            />

            <foxy-slider-field-thumb
              ref="foxySliderFieldStartThumbRef"
              :aria-describedby="messagesId"
              :focused="isFocused && activeThumbRef === foxySliderFieldStartThumbRef?.$el"
              :max="model[1]"
              :min="min"
              :model-value="model[0]"
              :position="trackRangeStart"
              class="foxy-slider-field__thumb foxy-slider-field__thumb--start"
              v-bind="{...thumbProps}"
              @blur="handleBlur"
              @focus="handleRangeFocusStart"
              @update:model-value="handleUpdateModelValue">
              <template v-if="hasSlot('thumb.labelStart')" #default>
                <slot name="thumb.labelStart"/>
              </template>
            </foxy-slider-field-thumb>

            <input
              :id="`${id}__stop`"
              :disabled="isDisabled"
              :name="name || id"
              :readonly="isReadonly"
              :value="model[1]"
              tabindex="-1"
            />

            <foxy-slider-field-thumb
              ref="foxySliderFieldStopThumbRef"
              :aria-describedby="messagesId"
              :focused="isFocused && activeThumbRef === foxySliderFieldStopThumbRef?.$el"
              :max="max"
              :min="model[0]"
              :model-value="model[1]"
              :position="trackRangeStop"
              class="foxy-slider-field__thumb foxy-slider-field__thumb--stop"
              v-bind="{...thumbProps}"
              @blur="handleBlur"
              @focus="handleRangeFocusStop"
              @update:model-value="handleUpdateModelValue">
              <template v-if="hasSlot('thumb.labelStop')" #default>
                <slot name="thumb.labelStop"/>
              </template>
            </foxy-slider-field-thumb>
          </template>
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
  import { FoxyInput, FoxyLabel, FoxySliderFieldThumb, FoxySliderFieldTrack } from '@foxy/components'

  import { useFocus, useSlider, useSlots, useSteps, useVModel } from '@foxy/composables'

  import { INPUT_PROPS } from '@foxy/consts'

  import { DENSITY, DIRECTION } from '@foxy/enums'

  import { ISliderFieldProps } from '@foxy/interfaces'

  import { TFoxyInput, TFoxySliderFieldThumb, TFoxySliderFieldTrack } from '@foxy/types'

  import { getSliderFieldOffset, keys, omit, pick } from '@foxy/utils'

  import { computed, ref, StyleValue, WritableComputedRef } from 'vue'

  const props = withDefaults(defineProps<ISliderFieldProps>(), {
    min: 0,
    max: 100,
    modelValue: 0,
    step: 0,
    direction: DIRECTION.HORIZONTAL,
    density: DENSITY.DEFAULT
  })

  const emits = defineEmits(['update:focused', 'update:modelValue', 'start', 'end'])

  const foxyInputRef = ref<TFoxyInput>()
  const foxySliderFieldThumbRef = ref<TFoxySliderFieldThumb>()
  const foxySliderFieldTrackRef = ref<TFoxySliderFieldTrack>()
  const foxySliderFieldStartThumbRef = ref<TFoxySliderFieldThumb>()
  const foxySliderFieldStopThumbRef = ref<TFoxySliderFieldThumb>()

  const { hasSlot } = useSlots()

  const isRange = computed(() => {
    return props.range
  })

  const steps = useSteps(props)
  const {
    activeThumbRef,
    min,
    max,
    mousePressed,
    roundValue,
    onSliderMousedown: handleSliderMousedown,
    onSliderTouchstart: handleSliderTouchstart,
    position,
    hasLabels
  } = useSlider({
    foxySliderFieldTrackRef,
    foxySliderFieldThumbRef,
    foxySliderFieldStartThumbRef,
    foxySliderFieldStopThumbRef,
    props,
    steps,
    onSliderStart: ({ value }) => {
      if (!isRange.value) {
        model.value = roundValue(value)
      }

      emits('start', model.value)
    },
    onSliderEnd: ({ value }) => {
      if (isRange.value) {
        const modelVal = model.value as [number, number]

        const newValue: [number, number] = activeThumbRef.value === foxySliderFieldStartThumbRef.value?.$el
          ? [value, modelVal[1]]
          : [modelVal[0], value]

        if (newValue[0] < newValue[1]) {
          model.value = newValue
        }
      } else {
        model.value = roundValue(value)
      }

      emits('end', model.value)
    },
    onSliderMove: ({ value }) => {
      if (isRange.value) {
        const [start, stop] = model.value as [number, number]

        if (start === stop && start !== min.value) {
          activeThumbRef.value = value > start ? foxySliderFieldStopThumbRef.value?.$el : foxySliderFieldStartThumbRef.value?.$el
          activeThumbRef.value?.focus()
        }

        if (activeThumbRef.value === foxySliderFieldStartThumbRef.value?.$el) {
          model.value = [Math.min(value, stop), stop]
        } else {
          model.value = [start, Math.max(start, value)]
        }
      } else {
        model.value = roundValue(value)
      }
    },
    getActiveThumb: (e: MouseEvent | TouchEvent) => {
      if (isRange.value) {
        if (!foxySliderFieldStartThumbRef.value || !foxySliderFieldStartThumbRef.value) return

        const startOffset = getSliderFieldOffset(e, foxySliderFieldStartThumbRef.value.$el, props.direction)
        const stopOffset = getSliderFieldOffset(e, foxySliderFieldStartThumbRef.value.$el, props.direction)

        const a = Math.abs(startOffset)
        const b = Math.abs(stopOffset)

        return (a < b || (a === b && startOffset < 0)) ? foxySliderFieldStartThumbRef.value.$el : foxySliderFieldStartThumbRef.value.$el
      } else {
        return foxySliderFieldThumbRef.value?.$el
      }
    }
  })
  const model = useVModel(
    props,
    'modelValue',
    isRange.value ? [min.value, max.value] : min.value,
    (value: number | string | Array<number> | Array<string> | undefined) => {
      if (isRange.value) {
        const array = value as Array<number> | Array<string>
        if (!array?.length) return [min.value, max.value]

        return array.map((val) => steps.roundValue(val))
      }

      return steps.roundValue(value == null ? steps.min.value : value as number | string)
    },
  ) as WritableComputedRef<[number, number] | number> & { readonly externalValue: Array<number> | number }

  const { isFocused, onFocus, onBlur } = useFocus(props)

  const handleFocus = (e: FocusEvent) => {
    onFocus()
  }
  const handleRangeFocusStart = (e: FocusEvent) => {
    onFocus()

    const modelVal = model.value as [number, number]

    activeThumbRef.value = foxySliderFieldStartThumbRef.value?.$el

    // Make sure second thumb is focused if
    // the thumbs are on top of each other
    // and they are both at minimum value
    // but only if focused from outside.
    if (modelVal[0] === modelVal[1] && modelVal[1] === min.value && e.relatedTarget !== foxySliderFieldStopThumbRef.value?.$el) {
      foxySliderFieldStartThumbRef.value?.$el.blur()
      foxySliderFieldStopThumbRef.value?.$el.focus()
    }
  }
  const handleRangeFocusStop = (e: FocusEvent) => {
    onFocus()

    const modelVal = model.value as [number, number]

    activeThumbRef.value = foxySliderFieldStopThumbRef.value?.$el

    // Make sure second thumb is focused if
    // the thumbs are on top of each other
    // and they are both at minimum value
    // but only if focused from outside.
    if (modelVal[0] === modelVal[1] && modelVal[0] === max.value && e.relatedTarget !== foxySliderFieldStartThumbRef.value?.$el) {
      foxySliderFieldStopThumbRef.value?.$el.blur()
      foxySliderFieldStartThumbRef.value?.$el.focus()
    }
  }
  const handleBlur = () => {
    onBlur()

    if (isRange.value) {
      activeThumbRef.value = undefined
    }
  }

  const trackStop = computed(() => {
    if (isRange.value) return

    return position(model.value as number)
  })
  const trackRangeStart = computed(() => {
    if (!isRange.value) return

    const modelVal = model.value as [number, number]

    return position(modelVal[0] as number)
  })
  const trackRangeStop = computed(() => {
    if (!isRange.value) return

    const modelVal = model.value as [number, number]

    return position(modelVal[1] as number)
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

  const sliderFieldStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const sliderFieldClasses = computed(() => {
    return [
      'foxy-slider-field',
      {
        'foxy-slider-field--has-labels': hasSlot('tickLabel') || hasLabels.value,
        'foxy-slider-field--focused': isFocused.value,
        'foxy-slider-field--pressed': mousePressed.value,
        'foxy-slider-field--disabled': props.disabled,
        'foxy-slider-field--range': isRange.value,
      },
      props.class
    ]
  })

  defineExpose({})
</script>

<style lang="scss" scoped>
  .foxy-slider-field {
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
        --foxy-slider-field__track---color: var(--foxy-slider-field--error__track---color, inherit);

        :not(.foxy-input--disabled) {
          --foxy-slider-field__track---background-color: var(--foxy-slider-field--error__track---background-color, currentColor);

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

        :deep(.foxy-slider-field-track) {
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

          .foxy-slider-field-track__background {
            height: 14px;
          }

          .foxy-slider-field-track__fill {
            height: inherit;
          }

          .foxy-slider-field-track__tick {
            margin-top: calc(calc(14px + 2px) / 2);
          }

          .foxy-slider-field-track__tick-label {
            margin-top: calc(14px / 2 + 8px);
            transform: translateX(-50%);
          }

          .foxy-slider-field-track__tick--first {
            margin-inline-start: calc(14px + 1px);
            transform: translateX(0%);
          }

          .foxy-slider-field-track__tick--last {
            margin-inline-start: calc(100% - 14px - 1px);
            transform: translateX(-100%);
          }
        }

        :deep(.foxy-slider-field-thumb) {
          top: 50%;
          transform: translateY(-50%);
          inset-inline-start: calc(var(--foxy-slider-field-thumb---position) - var(--foxy-slider-field-thumb---size, 20) / 2);

          .foxy-slider-field-thumb__label-container {
            left: calc(var(--foxy-slider-field-thumb---size, 4) / 2);
            top: 0;
          }

          .foxy-slider-field-thumb__label {
            bottom: calc(var(--foxy-slider-field-thumb---size, 4) / 2);
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

        :deep(.foxy-slider-field-track) {
          height: 100%;
          display: flex;
          justify-content: center;
          width: calc(var(--foxy-slider-field-track---size, 2) + 2px);
          touch-action: pan-x;

          .foxy-slider-field-track__background {
            width: var(--foxy-slider-field-track---size, 2);
          }

          .foxy-slider-field-track__fill {
            width: inherit;
          }

          .foxy-slider-field-track__ticks {
            height: 100%;
          }

          .foxy-slider-field-track__tick {
            margin-inline-start: calc(calc(var(--foxy-slider-field-track---size) + 2px) / 2);
            transform: translate(calc(var(--foxy-slider-field-track---size, 2) / -2), calc(var(--foxy-slider-field-track---size, 2) / 2));
          }

          .foxy-slider-field-track__tick--first {
            bottom: calc(0% + var(--foxy-slider-field-track---size, 2) + 1px);
          }

          .foxy-slider-field-track__tick--last {
            bottom: calc(100% - var(--foxy-slider-field-track---size, 2) - 1px);
          }

          .foxy-slider-field-track__tick-label {
            margin-inline-start: calc(var(--foxy-slider-field-track---size, 2) / 2 + 12px);
            transform: translateY(-50%);
          }
        }

        :deep(.foxy-slider-field-thumb) {
          top: calc(var(--foxy-slider-field-thumb---position) - var(--foxy-slider-field-thumb---size, 4) / 2);

          .foxy-slider-field-thumb__label-container {
            top: calc(var(--foxy-slider-field-thumb---size, 4) / 2);
            right: 0;
          }

          .foxy-slider-field-thumb__label {
            top: -12.5px;
            left: calc(var(--foxy-slider-field-thumb---size, 4) / 2);

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
      --foxy-slider-field---transition: var(--foxy-slider-field--pressed---transition, none);
    }

    &--focused {
      :deep(.foxy-slider-field-track) {
        .foxy-slider-field-track__tick {
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
