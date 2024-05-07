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

  import { DENSITY, DIRECTION } from '@foxy/enums'

  import { IInputProps } from '@foxy/interfaces'

  import { getUid } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IInputProps>(), {
    direction: DIRECTION.HORIZONTAL,
    centerAffix: true,
    density: DENSITY.DEFAULT
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
      id: id.value,
      messagesId: messagesId.value,
      isDirty: isDirty.value,
      isDisabled: isDisabled.value,
      isReadonly: isReadonly.value,
      isPristine: isPristine.value,
      isValid: isValid.value,
      isValidating: isValidating.value,
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
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-input {
    $this: &;

    display: grid;
    flex: 1 1 auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;

    &__details {
      align-items: flex-end;
      display: flex;
      font-size: 0.75rem;
      font-weight: 400;
      grid-area: messages;
      letter-spacing: 0.0333333333em;
      line-height: normal;
      min-height: 22px;
      padding-top: 6px;
      overflow: hidden;
      justify-content: space-between;
    }

    &__details,
    &__prepend,
    &__append {
      > .foxy-icon {
        opacity: 0.7;
      }
    }

    &__prepend,
    &__append {
      display: flex;
      align-items: flex-start;
      padding-top: 8px;
    }

    &__prepend {
      grid-area: prepend;
    }

    &__append {
      grid-area: append;
    }

    &__control {
      display: flex;
      grid-area: control;
    }

    &--disabled {
      pointer-events: none;
    }

    &--density-default {
      --foxy-input---density: 0;
    }

    &--density-compact {
      --foxy-input---density: -8px;
    }

    &--vertical {
      grid-template-areas: "append" "control" "prepend";
      grid-template-rows: max-content auto max-content;
      grid-template-columns: min-content;

      #{$this}__prepend {
        margin-block-start: 16px;
      }

      #{$this}__append {
        margin-block-end: 16px;
      }
    }

    &--horizontal {
      grid-template-areas: "prepend control append" "a messages b";
      grid-template-columns: max-content minmax(0, 1fr) max-content;
      grid-template-rows: auto auto;

      #{$this}__prepend {
        margin-inline-end: 16px;
      }

      #{$this}__append {
        margin-inline-start: 16px;
      }
    }

    &--disabled,
    &--error {
      #{$this}__details {
        > .foxy-messages {
          opacity: 1;
        }
      }

      #{$this}__details,
      #{$this}__prepend,
      #{$this}__append{
        > .foxy-icon {
          opacity: 1;
        }
      }
    }

    &--disabled {
      #{$this}__details,
      #{$this}__prepend,
      #{$this}__append {
        opacity: 0.5;
      }
    }

    &--error {
      &:not(#{$this}--disabled) {
        #{$this}__details {
          > .foxy-messages {
            color: rgba(255, 0, 0, 1);
          }
        }

        #{$this}__details,
        #{$this}__prepend,
        #{$this}__append{
          > .foxy-icon {
            color: rgba(255, 0, 0, 1);
          }
        }
      }
    }

    &--center-affix {
      #{$this}__prepend,
      #{$this}__append {
        align-items: center;
        padding-top: 0;
      }
    }

    &--hide-spin-buttons {
      :deep(input) {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type=number] {
          -moz-appearance: textfield;
        }
      }
    }
  }
</style>

<style>
  :root {

  }
</style>