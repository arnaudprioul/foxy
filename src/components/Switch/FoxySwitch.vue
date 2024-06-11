<template>
  <foxy-input
    :id="id"
    v-model="model"
    :class="switchClasses"
    :focused="isFocused"
    :style="switchStyles"
    v-bind="{ ...rootAttrs, ...inputProps }">
    <template #default="{id, messagesId, isDisabled, isReadonly, isValid}">
      <foxy-selection-control
        :id="id"
        ref="control"
        v-model="model"
        :aria-checked="indeterminate ? 'mixed' : undefined"
        :aria-describedby="messagesId"
        :disabled="isDisabled"
        :readonly="isReadonly"
        type="checkbox"
        v-bind="{ ...controlProps, ...controlAttrs }"
        @blur="handleBlur"
        @focus="handleFocus"
        @update:modelValue="handleChange">
        <template #default="{backgroundColorStyles, textColorStyles}">
          <div
            :style="[backgroundColorStyles, textColorStyles]"
            class="foxy-switch__track"
            @click="handleTrackClick">
            <div v-if="hasSlot('trackTrue')" key="prepend" class="foxy-switch__track-true">
              <slot name="trackTrue" v-bind="{model, isValid}"/>
            </div>

            <div v-if="hasSlot('trackFalse')" key="append" class="foxy-switch__track-false">
              <slot name="trackFalse" v-bind="{model, isValid}"/>
            </div>
          </div>
        </template>

        <template #input="{model, backgroundColorStyles, icon, props: selectionControlProps}">
          <input
            ref="input"
            :aria-checked="selectionControlProps.type === 'checkbox' ? model : undefined"
            :aria-disabled="selectionControlProps.disabled"
            :aria-label="selectionControlProps.label"
            :checked="model"
            v-bind="selectionControlProps"/>

          <div
            :class="['foxy-switch__thumb', { 'foxy-switch__thumb--filled': !!icon || props.loading }]"
            :style="props.inset ? undefined : backgroundColorStyles"
          >
            <foxy-translate-scale>
              <template v-if="!props.loading">
                <foxy-icon v-if="icon" :icon="icon" size="x-small"/>
              </template>

              <template v-if="hasLoading">
                <slot name="loader">
                  <div class="foxy-switch__loader">
                    <foxy-progress
                      :active="!!props.loading"
                      :color="props.color"
                      :indeterminate="typeof props.loading !== 'number'"
                      :model-value="typeof props.loading === 'number' ? props.loading : undefined"
                      :size="SIZES.X_SMALL"
                      :type="PROGRESS_TYPE.CIRCULAR"
                      class="foxy-switch__progress foxy-switch__progress--circular"
                      thickness="2"
                    />
                  </div>
                </slot>
              </template>
            </foxy-translate-scale>
          </div>
        </template>
      </foxy-selection-control>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyIcon, FoxyInput, FoxyProgress, FoxySelectionControl, FoxyTranslateScale } from '@foxy/components'

  import { useFocus, useLoader, useSlots, useProxiedModel } from '@foxy/composables'

  import { INPUT_PROPS, SELECTION_CONTROL_PROPS } from '@foxy/consts'

  import { DENSITY, PROGRESS_TYPE, SIZES } from '@foxy/enums'

  import { ISwitchProps } from '@foxy/interfaces'

  import { filterInputAttrs, getUid, keys, omit, pick } from '@foxy/utils'

  import { computed, ref, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ISwitchProps>(), {
    density: DENSITY.DEFAULT,
    centerAffix: true
  })

  const emits = defineEmits(['update:modelValue', 'update:focused', 'update:indeterminate', 'click:label'])

  const indeterminate = useProxiedModel(props, 'indeterminate')
  const model = useProxiedModel(props, 'modelValue')
  const { isFocused, onFocus: handleFocus, onBlur: handleBlur } = useFocus(props)
  const attrs = useAttrs()
  const { hasSlot } = useSlots()

  const { loaderClasses } = useLoader(props)

  const control = ref()

  const uid = getUid()
  const id = computed(() => {
    return props.id || `switch-${uid}`
  })

  const handleChange = () => {
    if (indeterminate.value) {
      indeterminate.value = false
    }
  }
  const handleTrackClick = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    control.value?.input?.click()
  }

  const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
  const inputProps = computed(() => {
    return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'class', 'focused', 'id', 'style'])
  })
  const controlProps = computed(() => {
    return omit(pick(props, keys(SELECTION_CONTROL_PROPS)), ['modelValue', 'type', 'disabled', 'readonly', 'id'])
  })

  const hasLoading = computed(() => {
    return hasSlot('loader') || !!props.loading
  })

  // CLASS & STYLES

  const switchStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const switchClasses = computed(() => {
    return [
      'foxy-switch',
      {
        'foxy-switch--flat': props.flat,
        'foxy-switch--inset': props.inset,
        'foxy-switch--indeterminate': indeterminate.value
      },
      loaderClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-switch {
    $this: &;

    :deep(.foxy-label) {
      padding-inline-start: 10px;
    }

    &__loader {
      display: flex;

      .foxy-progress {
        color: currentColor;
      }
    }

    &__track,
    &__thumb {
      transition: none;

      @media (forced-colors: active) {
        border: 1px solid;
        color: buttontext;
      }
    }

    .foxy-selection-control {
      min-height: calc(var(--foxy-input__control---height, 56px) + var(--foxy-input---density, 0px));

      :deep(.foxy-selection-control__input) {
        border-radius: 50%;
        transition: 0.2s transform cubic-bezier(0.4, 0, 0.2, 1);
        position: absolute;
        transform: translateX(-10px);

        .foxy-icon {
          position: absolute;
        }
      }

      &--dirty {
        :deep(.foxy-selection-control__input) {
          transform: translateX(10px);
        }
      }

      &--error {
        &:not(.foxy-selection-control--disabled) {
          #{$this}__track,
          #{$this}__thumb {
            background-color: rgba(255, 0, 0, 1);
            color: rgba(255, 255, 255, 5);
          }
        }
      }

      &:not(.foxy-selection-control--dirty) {
        #{$this}__track-true {
          opacity: 0;
        }
      }

      &--dirty {
        #{$this}__track-false {
          opacity: 0;
        }
      }
    }

    &.foxy-input {
      flex: 0 1 auto;

      &--vertical {
        :deep(.foxy-label) {
          min-width: max-content;
        }

        :deep(.foxy-selection-control__wrapper) {
          transform: rotate(-90deg);
        }
      }
    }

    &__track-true {
      margin-inline-end: auto;
    }

    &__track-false {
      margin-inline-start: auto;
    }

    &__track {
      display: inline-flex;
      align-items: center;
      font-size: 0.5rem;
      padding: 0 5px;
      background-color: rgb(163, 163, 163);
      border-radius: 9999px;
      height: 14px;
      opacity: 0.6;
      min-width: 36px;
      cursor: pointer;
      transition: 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__thumb {
      align-items: center;
      background-color: rgb(71, 71, 71);
      color: rgb(255, 255, 255);
      border-radius: 50%;
      display: flex;
      font-size: 0.75rem;
      height: 20px;
      justify-content: center;
      width: 20px;
      pointer-events: none;
      transition: 0.15s 0.05s transform cubic-bezier(0, 0, 0.2, 1), 0.2s color cubic-bezier(0.4, 0, 0.2, 1), 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      @media (forced-colors: active) {
        background-color: buttontext;
      }
    }

    &#{$this}--inset {
      #{$this}__track {
        border-radius: 9999px;
        font-size: 0.75rem;
        height: 32px;
        min-width: 52px;

        @media (forced-colors: active) {
          border-width: 2px;
        }
      }

      #{$this}__thumb {
        height: 24px;
        width: 24px;
        transform: scale(0.6666666667);

        &--filled {
          transform: none;
        }
      }

      .foxy-selection-control {
        &--dirty {
          #{$this}__thumb {
            transform: none;
            transition: 0.15s 0.05s transform cubic-bezier(0, 0, 0.2, 1);
          }
        }


      }

      :deep(.foxy-selection-control__wrapper) {
        width: auto;
      }

      &:not(#{$this}--loading) {
        &:not(.foxy-input--disabled) {
          .foxy-selection-control--dirty {
            #{$this}__thumb {
              @media (forced-colors: active) {
                background-color: highlighttext;
                color: highlighttext;
              }
            }
          }
        }
      }
    }

    &:not(#{$this}--inset) {
      #{$this}__thumb {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      }
    }

    &#{$this}--flat {
      :not(#{$this}--inset) {
        #{$this}__thumb {
          background: rgb(var(--v-theme-surface-variant));
          color: rgb(var(--v-theme-on-surface-variant));
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }

    &#{$this}--indeterminate {
      :deep(.foxy-selection-control__input) {
        transform: scale(0.8);
      }

      #{$this}__thumb {
        transform: scale(0.75);
        box-shadow: none;
      }
    }

    &#{$this}--disabled {
      #{$this}__thumb {
        @media (forced-colors: active) {
          background-color: graytext;
        }
      }

      #{$this}__track,
      #{$this}__thumb {
        @media (forced-colors: active) {
          color: graytext;
        }
      }
    }

    &#{$this}--loading {
      #{$this}__thumb {
        @media (forced-colors: active) {
          background-color: canvas;
        }
      }

      &#{$this}--inset,
      &#{$this}--indeterminate {
        #{$this}__thumb {
          @media (forced-colors: active) {
            border-width: 0;
          }
        }
      }
    }

    &:not(.foxy-input--loading) {
      &:not(.foxy-input--disabled) {
        .foxy-selection-control--dirty {
          #{$this}__thumb {
            @media (forced-colors: active) {
              background-color: highlight;
            }
          }
        }
      }
    }

    &:not(.foxy-input--disabled) {
      .foxy-selection-control--dirty {
        #{$this}__track {
          @media (forced-colors: active) {
            background-color: highlight;
          }
        }

        #{$this}__track,
        #{$this}_thumb {
          @media (forced-colors: active) {
            color: highlight;
          }
        }
      }
    }
  }
</style>

<style>
  :root {

  }
</style>