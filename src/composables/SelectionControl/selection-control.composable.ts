import { useBackgroundColor, useDensity, useTextColor } from '@foxy/composables'

import { FOXY_SELECTION_CONTROL_GROUP_KEY } from '@foxy/consts'

import { ISelectionControlProps } from '@foxy/interfaces'

import { deepEqual, useProxiedModel, wrapInArray } from '@foxy/utils'

import { computed, inject } from 'vue'

export function useSelectionControl (props: ISelectionControlProps) {
  const group = inject(FOXY_SELECTION_CONTROL_GROUP_KEY, undefined)

  const { densityClasses } = useDensity(props)

  const modelValue = useProxiedModel(props, 'modelValue')

  const trueValue = computed(() => {
    return props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true
  })
  const falseValue = computed(() => {
    return props.falseValue !== undefined ? props.falseValue : false
  })

  const isMultiple = computed(() => {
    return !!props.multiple || (props.multiple == null && Array.isArray(modelValue.value))
  })

  const model = computed({
    get () {
      const val = group ? group.modelValue.value : modelValue.value

      return isMultiple.value
          ? wrapInArray(val).some((v: any) => props.valueComparator ? props.valueComparator(v, trueValue.value) : deepEqual(v, trueValue.value))
          : props.valueComparator ? props.valueComparator(val, trueValue.value) : deepEqual(val, trueValue.value)
    },
    set (val: boolean) {
      if (props.readonly) return

      const currentValue = val ? trueValue.value : falseValue.value

      let newVal = currentValue

      if (isMultiple.value) {
        newVal = val
            ? [...wrapInArray(modelValue.value), currentValue]
            : wrapInArray(modelValue.value).filter((item: any) => props.valueComparator ? !props.valueComparator(item, trueValue.value) : !deepEqual(item, trueValue.value))
      }

      if (group) {
        group.modelValue.value = newVal
      } else {
        modelValue.value = newVal
      }
    },
  })

  const { textColorStyles } = useTextColor(computed(() => {
    if (props.error || props.disabled) return undefined

    return model.value ? props.activeColor : props.color
  }))
  const { backgroundColorStyles } = useBackgroundColor(computed(() => {
    return (model.value && !props.error && !props.disabled) ? props.activeBgColor : props.bgColor
  }))

  const icon = computed(() => {
    return model.value ? props.trueIcon : props.falseIcon
  })

  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorStyles,
    backgroundColorStyles,
    icon
  }
}