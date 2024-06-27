<template>
  <foxy-input
    :id="id"
    v-model="model"
    :class="radioGroupClasses"
    :style="radioGroupStyles"
    v-bind="{ ...rootAttrs, ...inputProps }">
    <template #default="{id, messagesId, isDisabled, isReadonly, isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">

        <slot name="label" v-bind="{label, required}">
          <foxy-label :id="id" :required="required" :text="label"/>
        </slot>

        <foxy-selection-control-group
          :id="id"
          v-model="model"
          :aria-describedby="messagesId"
          :aria-labelledby="label ? id : undefined"
          :disabled="isDisabled"
          :items="items"
          :multiple="false"
          :readonly="isReadonly"
          v-bind="{ ...controlProps , ...controlAttrs}">
          <template #item="{item}">
            <slot name="item" v-bind="{id, messagesId, isDisabled, isReadonly, isValid}">
              <foxy-radio
                v-model="model"
                :aria-describedby="messagesId"
                :disabled="isDisabled"
                :readonly="isReadonly"
                v-bind="item"/>
            </slot>
          </template>
        </foxy-selection-control-group>
      </slot>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyInput, FoxyLabel, FoxyRadio, FoxySelectionControlGroup } from '@foxy/components'

  import { useVModel } from '@foxy/composables'

  import { INPUT_PROPS, RADIO_PROPS, SELECTION_CONTROL_GROUP_PROPS } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { IRadioGroupProps } from '@foxy/interfaces'

  import { filterInputAttrs, getUid, keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<IRadioGroupProps>(), {
    density: DENSITY.DEFAULT,
    trueIcon: '$radioOn',
    falseIcon: '$radioOff',
  })

  const attrs = useAttrs()

  const uid = getUid()
  const id = computed(() => {
    return props.id || `radio-group-${uid}`
  })
  const model = useVModel(props, 'modelValue')

  const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
  const inputProps = computed(() => {
    return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'id', 'focused'])
  })
  const controlProps = computed(() => {
    return omit(pick(props, keys(SELECTION_CONTROL_GROUP_PROPS)), ['modelValue', 'id', 'readonly', 'disabled', 'type', 'multiple', 'items'])
  })
  const radioProps = computed(() => {
    return pick(props, keys(RADIO_PROPS))
  })

  const items = computed(() => {
    return props.items?.map((item) => {
      return {
        ...radioProps.value,
        ...item
      }
    })
  })

  // CLASS & STYLES

  const radioGroupStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const radioGroupClasses = computed(() => {
    return [
      'foxy-radio-group',
      props.class,
    ]
  })
</script>
