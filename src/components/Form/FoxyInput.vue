<template>
  <div :class="inputClasses" :style="inputStyles">
    <span v-if="hasPrepend" key="prepend" class="foxy-input__prepend" @click="handleClickPrepend">
      <slot name="prepend">
        <foxy-avatar
            v-if="prependAvatar"
            key="prepend-avatar"
            :density="density"
            :image="prependAvatar"/>
        <foxy-icon
            v-if="prependIcon"
            key="prepend-icon"
            :density="density"
            :icon="prependIcon"/>
      </slot>
    </span>

    <div class="v-input__control">
      <slot name="default" v-bind="inputProps"/>
    </div>

    <span v-if="hasAppend" key="append" class="foxy-input__append" @click="handleClickAppend">
      <slot name="append">
       <foxy-avatar
           v-if="appendAvatar"
           key="append-avatar"
           :density="density"
           :image="appendAvatar"/>
       <foxy-icon
           v-if="appendIcon"
           key="append-icon"
           :density="density"
           :icon="appendIcon"/>
     </slot>
    </span>

    <div v-if="hasDetails" class="v-input__details">
      <slot name="details" v-bind="inputProps">
        <foxy-messages
            :id="messagesId"
            :active="hasMessages"
            :messages="messages">
          <template #default="message">
            <slot name="messages" v-bind="message"/>
          </template>
        </foxy-messages>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FoxyAvatar, FoxyIcon } from '@foxy/components'

  import {
    useAdjacent,
    useBorder,
    useDensity,
    useDimension,
    useElevation,
    useMargin,
    usePadding,
    useRounded,
    useSlots,
    useValidation
  } from '@foxy/composables'

  import { DIRECTION } from '@foxy/enums'

  import { IInputProps } from '@foxy/interfaces'

  import { getUid } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IInputProps>(), {
    direction: DIRECTION.HORIZONTAL,
    centerAffix: true
  })

  const emits = defineEmits(['update:modelValue'])

  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { roundedStyles, roundedClasses } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { elevationClasses } = useElevation(props)

  const uid = getUid()
  const id = computed(() => {
    return props.id || `input-${uid}`
  })
  const messagesId = computed(() => {
    return `${id.value}-messages`
  })

  const {
    errorMessages,
    isDirty,
    isDisabled,
    isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses,
  } = useValidation(props, 'foxy-input', id)

  const { hasPrepend, hasAppend, handleClickAppend, handleClickPrepend } = useAdjacent(props)

  const messages = computed(() => {
    if (props.errorMessages?.length || (!isPristine.value && errorMessages.value.length)) {
      return errorMessages.value
    } else if (props.hint && (props.persistentHint || props.focused)) {
      return props.hint
    }

    return props.messages ?? []
  })

  const inputProps = computed(() => {
    return {
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate
    }
  })

  const { hasSlot } = useSlots()
  const hasMessages = computed(() => {
    return messages.value.length > 0
  })
  const hasDetails = computed(() => {
    return !props.hideDetails || (
        props.hideDetails === 'auto' &&
        (hasMessages || hasSlot('details'))
    )
  })

  // CLASS & STYLES

  const inputStyles = computed(() => {
    return [
      dimensionStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style,
    ] as StyleValue
  })
  const inputClasses = computed(() => {
    return [
      'foxy-input',
      `foxy-input--${props.direction}`,
      {
        'foxy-input--center-affix': props.centerAffix,
        'foxy-input--hide-spin-buttons': props.hideSpinButtons,
      },
      densityClasses.value,
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      elevationClasses.value,
      validationClasses.value,
      props.class,
      props.class,
    ]
  })
</script>
