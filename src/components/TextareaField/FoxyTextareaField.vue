<template>
  <foxy-input
      ref="foxyInputRef"
      v-model="model"
      :center-affix="isUniqueRow"
      :class="textareaFieldClasses"
      :focused="isFocused"
      :style="textareaFieldStyles"
      v-bind="{ ...rootAttrs, ...inputProps }">
    <template v-if="hasSlot('prepend')" #prepend>
      <slot name="prepend"/>
    </template>

    <template #default="{id, isDisabled, isDirty, isReadonly, isValid}">
      <foxy-field
          :id="id"
          ref="foxyFieldRef"
          :active="isActive || isDirty"
          :center-affix="isUniqueRow"
          :dirty="isDirty || dirty"
          :disabled="isDisabled"
          :error="isValid === false"
          :focused="isFocused"
          :style="textareaFieldFieldStyles"
          v-bind="{ ...fieldProps }"
          @click="handleControlClick"
          @mousedown="handleControlMousedown"
          @click:clear="handleClear"
          @click:prependInner="handleClickPrependInner"
          @click:appendInner="handleClickAppendInner">
        <template v-if="hasSlot('loader')" #loader>
          <slot name="loader"/>
        </template>

        <template v-if="hasSlot('prependInner')" #prependInner>
          <slot name="prependInner"/>
        </template>

        <template v-if="hasSlot('floatingLabel')" #floatingLabel>
          <slot name="floatingLabel"/>
        </template>

        <template v-if="hasSlot('label')" #label>
          <slot name="label"/>
        </template>

        <template v-if="hasSlot('prefix')" #prefix>
          <slot name="prefix"/>
        </template>

        <template #default="{class: fieldSlotClass, ...fieldSlotProps}">
          <div :class="fieldSlotClass" data-no-activator="">
            <slot name="default" v-bind="fieldSlotProps"/>
            <textarea
                ref="textareaRef"
                v-intersect="intersect"
                :autofocus="autofocus"
                :disabled="isDisabled"
                :name="name"
                :placeholder="placeholder"
                :readonly="isReadonly"
                :rows="rows"
                :value="model"
                v-bind="{ ...fieldSlotProps, ...inputAttrs }"
                @blur="handleBlur"
                @focus="handleFocus"
                @input="handleInput"/>
          </div>
          <div v-if="!autoGrow" ref="verticalDragger" class="foxy-textarea-field__grip">
            <svg aria-hidden="true" height="1em" preserveAspectRatio="xMidYMid meet"
                 role="img" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M21 11H3V9h18zm0 2H3v2h18z" fill="currentColor"></path>
            </svg>
          </div>
        </template>

        <template v-if="hasSlot('suffix')" #suffix>
          <slot name="suffix"/>
        </template>

        <template v-if="hasSlot('appendInner')" #appendInner>
          <slot name="appendInner"/>
        </template>

        <template v-if="hasSlot('clear')" #clear>
          <slot name="clear"/>
        </template>
      </foxy-field>
    </template>

    <template v-if="hasSlot('append')" #append>
      <slot name="append"/>
    </template>

    <template v-if="hasDetails" #details="detailsSlotProps">
      <slot name="details" v-bind="detailsSlotProps">
        <foxy-counter
            :active="props.persistentCounter || isFocused"
            :disabled="props.disabled"
            :max="max"
            :value="counterValue"
        >
          <template v-if="hasSlot('counter')" #default="{counter, value, max}">
            <slot name="counter" v-bind="{counter, value, max}"/>
          </template>
        </foxy-counter>
      </slot>
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
import {FoxyCounter, FoxyField, FoxyInput} from '@foxy/components'

import {useAdjacentInner, useDragResizer, useFocus, useSlots, useVModel} from '@foxy/composables'

import {FIELD_PROPS, INPUT_PROPS} from '@foxy/consts'

import {vIntersect} from '@foxy/directives'

import {AXIS, DENSITY} from '@foxy/enums'

import {ITextareaFieldProps} from '@foxy/interfaces'

import {TFoxyField, TFoxyInput} from '@foxy/types'

import {clamp, convertToUnit, filterInputAttrs, keys, omit, pick} from '@foxy/utils'

import {computed, nextTick, onBeforeUnmount, ref, shallowRef, StyleValue, useAttrs, watch, watchEffect} from 'vue'

const props = withDefaults(defineProps<ITextareaFieldProps>(), {
  density: DENSITY.DEFAULT,
  clearIcon: '$clear',
  border: true,
  rounded: true,
  rows: 3
})

const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:clear', 'click:prepend', 'click:append', 'click:appendInner', 'click:prependInner'])

const attrs = useAttrs()
const {hasSlot} = useSlots()

const model = useVModel(props, 'modelValue')
const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
const {
  onClickAppendInner: handleClickAppendInner,
  onClickPrependInner: handleClickPrependInner
} = useAdjacentInner(props)

const counterValue = computed(() => {
  return typeof props.counterValue === 'function'
      ? props.counterValue(model.value)
      : (model.value || '').toString().length
})
const max = computed(() => {
  if (attrs.maxlength) return attrs.maxlength as string | number

  if (
      !props.counter ||
      (typeof props.counter !== 'number' &&
          typeof props.counter !== 'string')
  ) return undefined

  return props.counter
})

const intersect = computed(() => {
  return [{
    handler: handleIntersect,
  }, null, ['once']]
})

const handleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[]) => {
  if (!props.autofocus || !isIntersecting) return

  (entries[0].target as HTMLInputElement)?.focus?.()
}

const foxyInputRef = ref<TFoxyInput>()
const foxyFieldRef = ref<TFoxyField>()
const textareaRef = ref<HTMLTextAreaElement>()
const verticalDragger = ref<HTMLElement>()

const isActive = computed(() => {
  return props.persistentPlaceholder || isFocused.value || props.active
})

const focus = () => {
  if (textareaRef.value !== document.activeElement) {
    textareaRef.value?.focus()
  }

  if (!isFocused.value) onFocus()
}
const handleControlClick = (e: MouseEvent) => {
  focus()

  emits('click:control', e)
}
const handleControlMousedown = (e: MouseEvent) => {
  emits('mousedown:control', e)
}
const handleClear = (e: MouseEvent) => {
  e.stopPropagation()

  focus()

  nextTick(() => {
    model.value = ''

    emits('click:clear', e)
  })
}
const handleInput = (e: Event) => {
  const el = e.target as HTMLTextAreaElement

  model.value = el.value

  if (props.modelModifiers?.trim) {
    const caretPosition = [el.selectionStart, el.selectionEnd]

    nextTick(() => {
      el.selectionStart = caretPosition[0]
      el.selectionEnd = caretPosition[1]
    })
  }
}
const handleFocus = (_e: FocusEvent) => {
  focus()
}

const rows = ref(+props.rows)

const isUniqueRow = computed(() => {
  return rows.value === 1
})

watchEffect(() => {
  if (!props.autoGrow) rows.value = +props.rows
})

const minHeight = computed(() => {
  if (!textareaRef.value || !foxyFieldRef.value) return

  const style = getComputedStyle(textareaRef.value)
  const fieldStyle = getComputedStyle(foxyFieldRef.value.$el)

  const padding = parseFloat(style.getPropertyValue('--foxy-field---padding-top')) +
      parseFloat(style.getPropertyValue('--foxy-input---padding-top')) +
      parseFloat(style.getPropertyValue('--foxy-field---padding-bottom'))

  const lineHeight = parseFloat(style.lineHeight)

  return Math.max(
      parseFloat(props.rows) * lineHeight + padding,
      parseFloat(fieldStyle.getPropertyValue('--foxy-input__control---height'))
  )
})
const maxHeight = computed(() => {
  if (!textareaRef.value) return

  const style = getComputedStyle(textareaRef.value)

  const padding = parseFloat(style.getPropertyValue('--foxy-field---padding-top')) +
      parseFloat(style.getPropertyValue('--foxy-input---padding-top')) +
      parseFloat(style.getPropertyValue('--foxy-field---padding-bottom'))

  const lineHeight = parseFloat(style.lineHeight)

  return parseFloat(props.maxRows!) * lineHeight + padding || Infinity
})
const controlHeight = shallowRef(0)

const calculateInputHeight = () => {
  if (!props.autoGrow) return

  nextTick(() => {
    if (!textareaRef.value) return

    const style = getComputedStyle(textareaRef.value)

    const padding = parseFloat(style.getPropertyValue('--foxy-field---padding-top')) +
        parseFloat(style.getPropertyValue('--foxy-input---padding-top')) +
        parseFloat(style.getPropertyValue('--foxy-field---padding-bottom'))

    controlHeight.value = clamp(textareaRef.value?.scrollHeight + padding ?? 0, minHeight.value, maxHeight.value)
  })
}

watch([model, () => props.maxRows, () => props.density, () => props.rows], () => {
  calculateInputHeight
}, {immediate: true})
watch(minHeight, () => {
  controlHeight.value = minHeight.value
})
watch([verticalDragger, minHeight, maxHeight], () => {
  if (!verticalDragger.value) return

  useDragResizer(verticalDragger, controlHeight, minHeight.value, maxHeight.value, AXIS.Y)
})
watch(controlHeight, (newHeight) => {
  nextTick(() => {
    if (!textareaRef.value) return

    const style = getComputedStyle(textareaRef.value)

    const padding = parseFloat(style.getPropertyValue('--foxy-field---padding-top')) +
        parseFloat(style.getPropertyValue('--foxy-input---padding-top')) +
        parseFloat(style.getPropertyValue('--foxy-field---padding-bottom'))
    const lineHeight = parseFloat(style.lineHeight)

    rows.value = Math.floor((newHeight - padding) / lineHeight)
  })
})

let observer: ResizeObserver | undefined
watch(textareaRef, (val) => {
  if (val) {
    observer = new ResizeObserver(calculateInputHeight)
    observer.observe(textareaRef.value!)
  } else {
    observer?.disconnect()
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const hasCounter = computed(() => {
  return hasSlot('counter') || props.counter || props.counterValue
})
const hasDetails = computed(() => {
  return hasCounter.value || hasSlot('details')
})

const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

const inputProps = computed(() => {
  return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'class', 'focused', 'centerAffix'])
})
const fieldProps = computed(() => {
  return omit(pick(props, keys(FIELD_PROPS)), ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error', 'centerAffix'])
})

// CLASS & STYLES

const textareaFieldStyles = computed(() => {
  return [
    props.style
  ] as StyleValue
})
const textareaFieldClasses = computed(() => {
  return [
    'foxy-textarea-field foxy-text-field',
    {
      'foxy-textarea-field--prefixed': props.prefix,
      'foxy-textarea-field--suffixed': props.suffix,
      'foxy-text-field--prefixed': props.prefix,
      'foxy-text-field--suffixed': props.suffix,
      'foxy-textarea-field--auto-grow': props.autoGrow,
      'foxy-textarea-field--no-resize': props.noResize || props.autoGrow,
    },
    props.class
  ]
})
const textareaFieldFieldStyles = computed(() => {
  return {
    '--foxy-textarea-field__control---height': convertToUnit(controlHeight.value),
  }
})
</script>

<style lang="scss" scoped>
.foxy-textarea-field {
  $this: &;

  :deep(.foxy-field) {
    --foxy-textarea-field__control---height: var(--foxy-input__control---height);

    .foxy-field__field {
      --foxy-input__control---height: var(--foxy-textarea-field__control---height);
    }

    .foxy-field__input {
      flex: 1 1 auto;
      outline: none;
      -webkit-mask-image: linear-gradient(to bottom, transparent, transparent calc(var(--foxy-field---padding-top, 0px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)) - 6px), black calc(var(--foxy-field---padding-top, 0px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)) + 4px));
      mask-image: linear-gradient(to bottom, transparent, transparent calc(var(--foxy-field---padding-top, 0px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)) - 6px), black calc(var(--foxy-field---padding-top, 0px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)) + 4px));
    }

    &.foxy-field--no-label,
    &.foxy-field--active {
      textarea {
        opacity: 1;
      }
    }
  }

  :deep(textarea) {
    opacity: 0;
    flex: 1;
    min-width: 0;
    transition: 0.15s opacity cubic-bezier(0.4, 0, 0.2, 1);
    line-height: 1;

    &:focus,
    &:active {
      outline: none;
    }

    &:invalid {
      box-shadow: none;
    }
  }

  &--no-resize {
    :deep(.foxy-field__input) {
      resize: none;
    }
  }

  &__grip {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
    border-top-width: 0;
    cursor: ns-resize;
    height: 9px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.2;

    &:hover {
      color: currentColor;
      background-color: color-mix(in srgb, currentColor 30%, transparent)
    }
  }
}
</style>
