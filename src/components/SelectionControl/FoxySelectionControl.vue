<template>
  <div
      :class="selectionControlClasses"
      :style="selectionControlStyles"
      v-bind="rootAttrs">
    <div :style="textColorStyles" class="foxy-selection-control__wrapper">
      <slot name="default">
        <div v-ripple="rippleProp" class="foxy-selection-control__input">
          <slot name="input"
                v-bind="{model,textColorStyles,backgroundColorStyles,icon,props: {onFocus: handleFocus,onBlur: handleBlur,id}}">
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

        <div class="foxy-selection-control__label">
          <slot name="label">
            <foxy-label :label="label" for="id" @click="handleClickLabel"/>
          </slot>
        </div>
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

  const emits = defineEmits(['update:modelValue'])

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
    e.stopPropagation()
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
