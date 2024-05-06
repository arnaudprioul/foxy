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
            :error="isValid"
            :readonly="isReadonly"
            v-bind="{ ...checkboxBtnProps, ...controlAttrs }"
            @blur="blur"
            @focus="focus"
        />
      </slot>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyCheckboxBtn, FoxyInput } from '@foxy/components'

  import { useFocus } from '@foxy/composables'

  import { CHECKBOX_BTN_PROPS, INPUT_PROPS } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { ICheckboxProps } from '@foxy/interfaces'

  import { filterInputAttrs, getUid, keys, omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ICheckboxProps>(), { density: DENSITY.DEFAULT })

  const emits = defineEmits(['update:modelValue', 'update:focused'])

  const model = useProxiedModel(props, 'modelValue')
  const { isFocused, focus, blur } = useFocus(props)
  const attrs = useAttrs()

  const uid = getUid()
  const id = computed(() => props.id || `checkbox-${uid}`)

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
