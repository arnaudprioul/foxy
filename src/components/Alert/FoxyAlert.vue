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
          <foxy-icon v-if="hasIcon" key="prepend-icon" :icon="icon" :size="iconSize"/>
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
    useSlots,
    useStatus,
    useProxiedModel
  } from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'

  import { IAlertProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

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
  const { icon, statusClasses } = useStatus(props)
  const { hasSlot } = useSlots()

  const isActive = useProxiedModel(props, 'modelValue')

  const closeEvent = computed(() => {
    return {
      click (e: MouseEvent) {
        isActive.value = false

        emits('click:close', e)
      },
    }
  })
  const iconSize = computed(() => {
    return props.prominent ? 44 : 28
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
    return hasSlot('close') || props.closable
  })
  const hasIcon = computed(() => {
    return !!(props.icon || props.status)
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
        'foxy-alert--prominent': props.prominent,
      },
      statusClasses.value,
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

<style lang="scss" scoped>
  .foxy-alert {
    $this: &;

    display: grid;
    flex: 1 1;
    grid-template-areas: "prepend content append close" ". content . .";
    grid-template-columns: max-content auto max-content max-content;
    position: relative;
    padding: 16px;
    overflow: hidden;
    border-color: var(--foxy-alert---border-color);
    border-radius: 4px;

    background-color: var(--foxy-alert---background-color);
    color: var(--foxy-alert---color);
    box-shadow: var(--foxy-alert---box-shadow);

    &--absolute {
      position: absolute;
    }

    &--fixed {
      position: fixed;
    }

    &--sticky {
      position: sticky;
    }

    &--prominent {
      grid-template-areas: "prepend content append close" "prepend content . .";

      #{$this}__prepend {
        align-self: center;
      }
    }

    &--bordered {

      &#{$this}--border-start {
        padding-inline-start: 24px;

        #{$this}__underlay {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      &#{$this}--border-end {
        padding-inline-end: 24px;

        #{$this}__underlay {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      &#{$this}--border-top {
        #{$this}__underlay {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }

      &#{$this}--border-bottom {
        #{$this}__underlay {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }

    &--density-default {
      padding-bottom: 16px;
      padding-top: 16px;

      &#{$this}--border-top {
        padding-top: 24px;
      }

      &#{$this}--border-bottom {
        padding-bottom: 24px;
      }
    }

    &--density-compact {
      padding-bottom: 8px;
      padding-top: 8px;

      &#{$this}--border-top {
        padding-top: 16px;
      }

      &#{$this}--border-bottom {
        padding-bottom: 16px;
      }
    }

    &--warning {
      --foxy-alert---background-color: rgb(251, 140, 0);
      --foxy-alert---color: #ffffff;
    }

    &--success {
      --foxy-alert---background-color: rgb(76, 175, 80);
      --foxy-alert---color: #ffffff;
    }

    &--info {
      --foxy-alert---background-color: rgb(33, 150, 243);
      --foxy-alert---color: #ffffff;
    }

    &--error {
      --foxy-alert---background-color: rgb(207, 102, 121);
      --foxy-alert---color: #ffffff;
    }

    &__close {
      flex: 0 1 auto;
      grid-area: close;
    }

    &__content {
      align-self: center;
      grid-area: content;
      overflow: hidden;
    }

    &__append,
    &__close {
      align-self: flex-start;
      margin-inline-start: 16px;
    }

    &__append {
      align-self: flex-start;
      grid-area: append;
    }

    &__append {
      + #{$this}__close {
        margin-inline-start: 16px;
      }
    }

    &__prepend {
      align-self: flex-start;
      display: flex;
      align-items: center;
      grid-area: prepend;
      margin-inline-end: 16px;
    }

    &__underlay {
      grid-area: none;
      position: absolute;
    }

    &__title {
      align-items: center;
      align-self: center;
      display: flex;
      font-size: 1.25rem;
      font-weight: 500;
      hyphens: auto;
      letter-spacing: 0.0125em;
      line-height: 1.75rem;
      overflow-wrap: normal;
      text-transform: none;
      word-break: normal;
      word-wrap: break-word;
    }
  }

</style>

<style>
  :root {
    --foxy-alert---border-color: transparent;
    --foxy-alert---color: rgba(0, 0, 0, 0.87);
    --foxy-alert---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
    --foxy-alert---background-color: rgb(255, 255, 255);
  }
</style>
