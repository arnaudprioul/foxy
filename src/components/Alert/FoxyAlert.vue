<template>
  <component
      :is="tag"
      :class="alertClasses"
      :style="alertStyles"
      role="alert">
    <span key="underlay" class="foxy-alert__underlay"/>

    <slot name="wrapper">
      <div v-if="hasPrepend" key="prepend" class="foxy-alert__prepend">
        <slot name="prepend">
          <foxy-icon v-if="hasIcon" key="prepend-icon" :icon="icon" :size="props.prominent ? 44 : 28"/>
        </slot>
      </div>

      <div class="foxy-alert__content">
        <div v-if="hasTitle" class="foxy-alert__title">
          <slot name="title">{{ title }}</slot>
        </div>

        <div class="foxy-alert__body">
          <slot name="text">{{ text }}</slot>
        </div>

        <slot name="default"/>
      </div>

      <div v-if="hasAppend" key="append" class="foxy-alert__append">
        <slot name="append"/>
      </div>
    </slot>

    <div v-if="hasClose" key="close" class="foxy-alert__close">
      <slot name="close">
        <foxy-btn
            key="close-btn"
            :icon="closeIcon"
            size="x-small"
            v-on="closeEvent"/>
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyBtn, FoxyIcon } from '@foxy/components'

  import {
    useBorder,
    useBothColor,
    useDensity,
    useDimension,
    useElevation,
    useLocation,
    useMargin,
    usePadding,
    usePosition,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'

  import { IAlertProps } from '@foxy/interfaces'
  import { TIcon } from '@foxy/types'

  import { computed, ref, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IAlertProps>(), {
    tag: 'div',
    density: DENSITY.DEFAULT,
    closeIcon: '$close',
    modelValue: true
  })

  const emits = defineEmits(['click:close', 'update:modelValue'])

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { borderStyles, borderClasses } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { locationStyles } = useLocation(props)
  const { positionClasses } = usePosition(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { hasSlot } = useSlots()

  const isActive = ref(props.modelValue)

  const icon = computed(() => {
    if (props.icon === false) return undefined
    if (!props.status) return props.icon

    return typeof props.icon === 'string' ? props.icon : `$${props.status}`
  })
  const closeEvent = computed(() => {
    return {
      click (e: MouseEvent) {
        isActive.value = false

        emits('click:close', e)
      },
    }
  })

  // SLOTS

  const hasPrepend = computed(() => {
    return !!(hasSlot('prepend') || icon.value)
  })
  const hasAppend = computed(() => {
    return hasSlot('append')
  })
  const hasTitle = computed(() => {
    return !!(hasSlot('title') || props.title)
  })
  const hasClose = computed(() => {
    return !!(hasSlot('close') || props.closable)
  })
  const hasIcon = computed(() => {
    return !!(props.icon && props.status)
  })

  // CLASS & STYLES

  const alertStyles = computed(() => {
    return [
      dimensionStyles.value,
      colorStyles.value,
      locationStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      roundedStyles.value,
      props.style
    ] as StyleValue
  })
  const alertClasses = computed(() => {
    return [
      'foxy-alert',
      {
        [`foxy-alert--${props.type}`]: !!props.type,
        'foxy-alert--prominent': props.prominent,
      },
      densityClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      elevationClasses.value,
      positionClasses.value,
      roundedClasses.value,
      props.class,
    ]
  })
</script>
