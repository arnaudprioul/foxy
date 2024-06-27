<template>
  <foxy-input
    :id="id"
    v-model="model"
    :class="checkboxClasses"
    :focused="isFocused"
    :style="checkboxStyles"
    v-bind="{...rootAttrs, ...inputProps}">
    <template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
        <foxy-checkbox-btn
          :id="id"
          v-model="model"
          :aria-describedby="messagesId"
          :disabled="isDisabled"
          :error="!isValid"
          :readonly="isReadonly"
          v-bind="{ ...checkboxBtnProps, ...controlAttrs }"
          @blur="handleBlur"
          @focus="handleFocus"
          @click:label="handleClickLabel">
          <template v-if="hasSlot('default')" #default>
            <slot name="default"/>
          </template>

          <template v-if="hasSlot('input')" #input="{props, icon, textColorStyles, backgroundColorStyles, model}">
            <slot name="input" v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"/>
          </template>

          <template v-if="hasSlot('label')" #label>
            <slot name="label"/>
          </template>
        </foxy-checkbox-btn>
      </slot>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyCheckboxBtn, FoxyInput } from '@foxy/components'

  import { useFocus, useSlots, useVModel } from '@foxy/composables'

  import { CHECKBOX_BTN_PROPS, INPUT_PROPS } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { ICheckboxProps } from '@foxy/interfaces'

  import { filterInputAttrs, getUid, keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ICheckboxProps>(), {
    density: DENSITY.DEFAULT,
    trueIcon: '$checkboxOn',
    falseIcon: '$checkboxOff',
  })

  const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

  const model = useVModel(props, 'modelValue')
  const { isFocused, onFocus: handleFocus, onBlur: handleBlur } = useFocus(props)
  const attrs = useAttrs()
  const { hasSlot } = useSlots()

  const uid = getUid()
  const id = computed(() => props.id || `checkbox-${uid}`)

  const handleClickLabel = (e: Event) => {
    emits('click:label', e)
  }

  const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

  const inputProps = computed(() => {
    return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'id', 'focused'])
  })
  const checkboxBtnProps = computed(() => {
    return omit(pick(props, keys(CHECKBOX_BTN_PROPS)), ['modelValue', 'id', 'disabled', 'readonly', 'error'])
  })

  // CLASS & STYLES

  const checkboxStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const checkboxClasses = computed(() => {
    return [
      'foxy-checkbox',
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-checkbox {
    &.foxy-input {
      flex: 0 1 auto;
    }

    .foxy-selection-control {
      min-height: calc(56px + 2 * var(--foxy-input---density));
    }
  }
</style>

<style>
  :root {

  }
</style>