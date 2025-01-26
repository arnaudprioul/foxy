<template>
  <foxy-text-field
      ref="foxyTextFieldRef"
      v-model:focused="isFocused"
      :model-value="selectedValues"
      :aria-label="t(label)"
      :class="selectClasses"
      :counter-value="counterValue"
      :dirty="isDirty"
      :placeholder="placeholder"
      :style="selectStyles"
      :title="t(label)"
      :validation-value="validationValue"
      v-bind="{ ...textFieldProps }"
      @blur="handleBlur"
      @change="handleChange"
      @click:clear="handleClear"
      @mousedown:control="handleMousedownControl">
    <template v-if="hasSlot('prepend')" #prepend>
      <slot name="prepend"/>
    </template>

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

    <template #default>
      <foxy-menu
          ref="foxyMenuRef"
          v-model="menu"
          :close-on-content-click="false"
          :disabled="menuDisabled"
          :location="BLOCK.BOTTOM"
          :max-height="310"
          :max-width="200"
          :open-on-click="false"
          activator="parent"
          content-class="foxy-select__content"
          v-bind="{ ...menuProps }"
          @afterLeave="handleAfterLeave">

        <template #default>
          <foxy-date-picker
		          ref="foxyDatePickerRef"
              :model-value="model"
              v-bind="{...datePickerProps}"
              @update:model-value="handleSelectDate"
          />
        </template>
      </foxy-menu>
    </template>

    <template v-if="hasSlot('suffix')" #suffix>
      <slot name="suffix"/>
    </template>

    <template #appendInner>
      <slot name="appendInner">
        <foxy-avatar
            v-if="appendInnerAvatar"
            key="append-avatar"
            :density="density"
            :image="appendInnerAvatar"/>
        <foxy-icon
            v-if="appendInnerIcon"
            key="append-icon"
            :density="density"
            :icon="appendInnerIcon"/>
      </slot>
    </template>

    <template v-if="hasSlot('clear')" #clear>
      <slot name="clear"/>
    </template>

    <template v-if="hasSlot('append')" #append>
      <slot name="append"/>
    </template>
  </foxy-text-field>
</template>

<script lang="ts" setup>
  import { FoxyAvatar, FoxyDatePicker, FoxyIcon, FoxyMenu, FoxyTextField, FoxyTranslateScale } from "@foxy/components"

  import { useDate, useLocale, useProps, useSlots, useVModel } from "@foxy/composables"

  import { FOXY_FORM_KEY } from "@foxy/consts"

  import { BLOCK, DENSITY, DIRECTION, MDI_ICONS, TEXT_FIELD_TYPE } from "@foxy/enums"

  import { IDatePickerFieldProps } from "@foxy/interfaces"

  import { TFoxyDatePicker, TFoxyMenu, TFoxyTextField } from "@foxy/types"

  import { forwardRefs, matchesSelector, wrapInArray } from "@foxy/utils"

  import { computed, inject, ref, shallowRef, StyleValue, watch } from "vue"

  const props = withDefaults(defineProps<IDatePickerFieldProps>(), {
    type: TEXT_FIELD_TYPE.TEXT,
    centerAffix: true,
    direction: DIRECTION.HORIZONTAL,
    density: DENSITY.DEFAULT,
    border: true,
    rounded: true,
    modelValue: null,
    appendInnerIcon: MDI_ICONS.CALENDAR_OUTLINE,
    transition: { component: FoxyTranslateScale },
    closeText: 'foxy.close',
    openText: 'foxy.open',
    range: false,
    closeOnSelect: true
  })

  const { filterProps } = useProps<IDatePickerFieldProps>(props)

  const { t } = useLocale()

  const foxyTextFieldRef = ref<TFoxyTextField>()
  const foxyMenuRef = ref<TFoxyMenu>()
  const foxyDatePickerRef = ref<TFoxyDatePicker>()

  const { hasSlot } = useSlots()

  const model = useVModel(
      props,
      'modelValue',
      [],
      (v) => wrapInArray(v),
      (v) => props.range ? v : v[0]
  )

  const adapter = useDate()

  const handleSelectDate = (value) => {
		model.value = wrapInArray(value)

    if (props.closeOnSelect) {
      menu.value = false
    }
  }

  const menuState = useVModel(props, 'menu')
  const menu = computed<boolean>({
    get: () => menuState.value,
    set: (v) => {
      if (menuState.value && !v && foxyMenuRef.value?.openChildren) {
        return
      }

      menuState.value = v
    }
  })

  const selectedValues = computed(() => {
    return model.value.map((selection) => {
      return adapter.format(adapter.date(selection.value), 'keyboardDate')
    })
  })

  const isFocused = shallowRef(false)
  const form = inject(FOXY_FORM_KEY, null)

  const menuDisabled = computed(() => {
    return props.readonly || form?.isReadonly.value
  })
  const menuProps = computed(() => {
    return {
      ...props.menuProps,
      activatorProps: {
        ...(props.menuProps?.activatorProps || {}),
        'aria-haspopup': 'datepickerbox' // Set aria-haspopup to 'listbox'
      }
    }
  })

  const handleClear = (_e: MouseEvent) => {
	  model.value = []

    if (props.openOnClear) {
      menu.value = true
    }
  }
  const handleMousedownControl = () => {
    if (menuDisabled.value) return

    menu.value = !menu.value
  }
  const handleBlur = (e: FocusEvent) => {
    if (!foxyDatePickerRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
      menu.value = false
    }
  }
  const handleChange = (e: Event) => {
    if (matchesSelector(foxyTextFieldRef.value, ':autofill') || matchesSelector(foxyTextFieldRef.value, ':-webkit-autofill')) {
      // (e.target as HTMLInputElement).value
      // TODO -  Select date
    }
  }
  const handleAfterLeave = () => {
    if (isFocused.value) {
      foxyTextFieldRef.value?.focus()
    }
  }

  const textFieldProps = computed(() => {
    return foxyTextFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
  })

  const datePickerProps = computed(() => {
    return foxyDatePickerRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue'])
  })

  const isDirty = computed(() => {
    return model.value.length > 0
  })
  const placeholder = computed(() => {
    return isDirty.value || (!isFocused.value && props.label && !props.persistentPlaceholder) ? undefined : props.placeholder
  })
  const label = computed(() => {
    return menu.value ? props.closeText : props.openText
  })

  watch(isFocused, (val, oldVal) => {
    if (val === oldVal) return

    if (val) {

    } else {

    }
  })

  // CLASS & STYLES

  const selectStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const selectClasses = computed(() => {
    return [
      'foxy-date-picker-field',
      `foxy-date-picker-field--${props.range ? 'range' : 'single'}`,
      {
        'foxy-date-picker-field--active-menu': menu.value
      },
      props.class
    ]
  })

  // EXPOSE

  defineExpose(forwardRefs({
    filterProps,
    isFocused,
    menu
  }, foxyTextFieldRef))
</script>

<style lang="scss" scoped>

</style>
