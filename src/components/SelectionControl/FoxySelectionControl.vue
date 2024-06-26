<template>
  <div
      :class="selectionControlClasses"
      :style="selectionControlStyles"
      v-bind="rootAttrs">
    <div :style="textColorStyles" class="foxy-selection-control__wrapper">
      <slot name="default"
            v-bind="{ model, textColorStyles, backgroundColorStyles, icon, props: { onFocus: handleFocus, onBlur: handleBlur, id } }"/>

      <div v-ripple="rippleProp" class="foxy-selection-control__input">
        <slot name="input"
              v-bind="{ model, textColorStyles, backgroundColorStyles, icon, props: { ...inputAttrs, disabled: props.disabled, label: props.label, name: props.name, type: props.type, value: trueValue, onFocus: handleFocus, onBlur: handleBlur, id, onInput: handleInput } }">
          <template v-if="icon">
            <foxy-icon key="icon" :icon="icon"/>
          </template>

          <input
              :id="id"
              ref="input"
              :aria-checked="props.type === 'checkbox' ? model : undefined"
              :aria-disabled="props.disabled"
              :aria-label="props.label"
              :checked="model"
              :disabled="props.disabled"
              :name="props.name"
              :type="props.type"
              :value="trueValue"
              v-bind="inputAttrs"
              @blur="handleBlur"
              @focus="handleFocus"
              @input="handleInput"
          />
        </slot>
      </div>
    </div>

    <div class="foxy-selection-control__label">
      <slot name="label">
        <foxy-label :required="required" :for="id" :text="label" @click="handleClickLabel"/>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FoxyIcon, FoxyLabel } from '@foxy/components'

  import { useSelectionControl } from '@foxy/composables'

  import { vRipple } from '@foxy/directives'

  import { ISelectionControlProps } from '@foxy/interfaces'

  import { filterInputAttrs, getUid, matchesSelector } from '@foxy/utils'

  import { computed, nextTick, ref, shallowRef, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ISelectionControlProps>(), {})

  const emits = defineEmits(['update:modelValue', 'click:label'])

  const attrs = useAttrs()

  const {
    group,
    densityClasses,
    icon,
    model,
    textColorStyles,
    backgroundColorStyles,
    trueValue,
  } = useSelectionControl(props)

  const uid = getUid()
  const isFocused = shallowRef(false)
  const isFocusVisible = shallowRef(false)
  const input = ref<HTMLInputElement>()
  const id = computed(() => props.id || `input-${uid}`)
  const isInteractive = computed(() => {
    return !props.disabled && !props.readonly
  })

  group?.onForceUpdate(() => {
    if (input.value) {
      input.value.checked = model.value
    }
  })

  const handleFocus = (e: FocusEvent) => {
    if (!isInteractive.value) return

    isFocused.value = true
    if (matchesSelector(e.target as HTMLElement, ':focus-visible') !== false) {
      isFocusVisible.value = true
    }
  }
  const handleBlur = () => {
    isFocused.value = false
    isFocusVisible.value = false
  }
  const handleClickLabel = (e: Event) => {
    emits('click:label', e)
  }
  const handleInput = (e: Event) => {
    if (!isInteractive.value) return

    if (props.readonly && group) {
      nextTick(() => group.forceUpdate())
    }
    model.value = (e.target as HTMLInputElement).checked
  }

  const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

  const rippleProp = computed(() => {
    if (props.ripple) {
      return [!props.disabled && !props.readonly, null, ['center', 'circle']]
    }

    return
  })

  // CLASS & STYLES

  const selectionControlStyles = computed(() => {
    return [
      textColorStyles.value,
      backgroundColorStyles.value,
      props.style,
    ] as StyleValue
  })
  const selectionControlClasses = computed(() => {
    return [
      'foxy-selection-control',
      {
        'foxy-selection-control--dirty': model.value,
        'foxy-selection-control--disabled': props.disabled,
        'foxy-selection-control--error': props.error,
        'foxy-selection-control--focused': isFocused.value,
        'foxy-selection-control--focus-visible': isFocusVisible.value,
        'foxy-selection-control--inline': props.inline,
      },
      densityClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-selection-control {
    $this: &;

    align-items: center;
    contain: layout;
    display: flex;
    flex: 1 0;
    grid-area: control;
    position: relative;
    user-select: none;

    .foxy-label {
      white-space: normal;
      word-break: break-word;
      height: 100%;
    }

    &__wrapper {
      width: calc(40px + 1.5 * var(--foxy-selection-control--density));
      height: calc(40px + 1.5 * var(--foxy-selection-control--density));
      display: inline-flex;
      align-items: center;
      position: relative;
      justify-content: center;
      flex: none;
    }

    &__input {
      width: calc(40px + 1.5 * var(--foxy-selection-control--density));
      height: calc(40px + 1.5 * var(--foxy-selection-control--density));
      align-items: center;
      display: flex;
      flex: none;
      justify-content: center;
      position: relative;
      border-radius: 50%;

      > .foxy-icon {
        opacity: 0.7;
      }

      :deep(input) {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: currentColor;
        opacity: 0;
        pointer-events: none;
      }

      &:hover {
        &:before {
          opacity: 0.04;
        }
      }
    }

    &--disabled,
    &--dirty,
    &--error {
      #{$this}__input {
        > .foxy-icon {
          opacity: 1;
        }
      }
    }

    &--error,
    &--disabled {
      .foxy-label {
        opacity: 1;
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--error {
      :not(#{$this}--disabled) {
        .foxy-label {
          color: rgba(255, 0, 0, 1);
        }

        #{$this}__input {
          > .foxy-icon {
            color: rgba(255, 0, 0, 1);
          }
        }
      }
    }

    &--inline {
      display: inline-flex;
      flex: 0 0 auto;
      min-width: 0;
      max-width: 100%;

      .foxy-label {
        width: auto;
      }
    }

    &--focus-visible {
      #{$this}__input {
        &:before {
          opacity: 0.7;
        }
      }
    }

    &--density-default {
      --foxy-selection-control--density: 0px;
    }

    &--density-compact {
      --foxy-selection-control--density: -8px;
    }
  }
</style>

<style>
  :root {

  }
</style>