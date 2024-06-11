<template>
  <foxy-overlay
    ref="overlay"
    v-model="isActive"
    :class="snackbarClasses"
    :contentProps="contentProps"
    :scrim="false"
    :scrollStrategy="SCROLL_STRATEGIES.NONE"
    :style="snackbarStyles"
    disableGlobalStack
    noClickAnimation
    persistent
    v-bind="{ ...overlayProps, ...scopeId }"
    @touchend="handleTouchend"
    @touchstartPassive="handleTouchstart">
    <template #default>
      <span key="underlay" class="foxy-snackbar__underlay"/>

      <div v-if="props.timer && !isHovering" key="timer" class="foxy-snackbar__timer">
        <foxy-progress
          ref="timerRef"
          :max="props.timeout"
          :model-value="countdown.time.value"
          :type="PROGRESS_TYPE.LINEAR"/>
      </div>

      <div
        v-if="hasContent"
        key="content"
        aria-live="polite"
        class="foxy-snackbar__content"
        role="status">
        <template v-if="hasPrepend">
          <div class="foxy-snackbar__prepend">
            <slot name="prepend">
              <foxy-icon v-if="hasIcon" key="prepend-icon" :icon="icon as TIcon" :size="28"/>
            </slot>
          </div>
        </template>

        <slot name="text"><span>{{ text }}</span></slot>
        <slot name="default"/>
      </div>

      <div v-if="hasSlot('action')" class="foxy-snackbar__actions">
        <slot name="action" v-bind="{ isActive }"/>
      </div>

    </template>
  </foxy-overlay>
</template>

<script lang="ts" setup>
  import { FoxyIcon, FoxyOverlay, FoxyProgress, FoxySnack } from '@foxy/components'

  import {
    useBorder,
    useBothColor,
    useCountdown,
    useElevation,
    useLayout,
    useMargin,
    usePadding,
    usePosition,
    useRounded,
    useScopeId,
    useSlots,
    useStatus,
    useToggleScope,
    useProxiedModel
  } from '@foxy/composables'

  import { FOXY_LAYOUT_KEY, OVERLAY_PROPS } from '@foxy/consts'

  import { PROGRESS_TYPE, SCROLL_STRATEGIES } from '@foxy/enums'

  import { ISnackbarProps } from '@foxy/interfaces'

  import { TFoxyOverlay, TFoxyProgress, TIcon } from '@foxy/types'

  import { keys, omit, pick, refElement } from '@foxy/utils'

  import { computed, inject, mergeProps, onMounted, ref, shallowRef, StyleValue, toRef, watch, watchEffect } from 'vue'

  const props = withDefaults(defineProps<ISnackbarProps>(), {
    timeout: 5000,
    location: 'bottom',
    border: true,
    rounded: true,
    elevation: 1,
    transition: {
      component: FoxySnack
    }
  })

  const { hasSlot } = useSlots()

  const isActive = useProxiedModel(props, 'modelValue')
  const { positionClasses } = usePosition(props)
  const { scopeId } = useScopeId()
  const countdown = useCountdown(Number(props.timeout))
  const { icon, statusClasses } = useStatus(props)

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { elevationClasses } = useElevation(props)

  const overlay = ref<TFoxyOverlay>()
  const timerRef = ref<TFoxyProgress>()
  const isHovering = shallowRef(false)
  const startY = shallowRef(0)
  const mainStyles = ref()
  const hasLayout = inject(FOXY_LAYOUT_KEY, undefined)

  useToggleScope(() => !!hasLayout, () => {
    const layout = useLayout()

    watchEffect(() => {
      mainStyles.value = layout.mainStyles.value
    })
  })

  let activeTimeout = -1
  const startTimeout = () => {
    countdown.reset()
    window.clearTimeout(activeTimeout)
    const timeout = Number(props.timeout)

    if (!isActive.value || timeout === -1) return

    const element = refElement(timerRef.value)

    countdown.start(element)

    activeTimeout = window.setTimeout(() => {
      isActive.value = false
    }, timeout)
  }
  const clearTimeout = () => {
    countdown.reset()
    window.clearTimeout(activeTimeout)
  }

  watch(isActive, startTimeout)
  watch(() => props.timeout, startTimeout)

  onMounted(() => {
    if (isActive.value) startTimeout()
  })

  const handlePointerenter = () => {
    isHovering.value = true
    clearTimeout()
  }
  const handlePointerleave = () => {
    isHovering.value = false
    startTimeout()
  }
  const handleTouchstart = (event: TouchEvent) => {
    startY.value = event.touches[0].clientY
  }
  const handleTouchend = (event: TouchEvent) => {
    if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
      isActive.value = false
    }
  }

  const overlayProps = computed(() => {
    const overlayProps = pick(props, keys(OVERLAY_PROPS))

    return omit(overlayProps, ['class', 'style', 'contentProps', 'modelValue', 'disableGlobalStack', 'noClickAnimation', 'persistent', 'scrim', 'scrollStrategy'])
  })
  const contentProps = computed(() => {
    return mergeProps({
      class: [
        'foxy-snackbar__wrapper'
      ],
      style: [
        colorStyles.value,
        roundedStyles.value,
        borderStyles.value,
        paddingStyles.value,
        marginStyles.value,
      ],
      onPointerenter: handlePointerenter,
      onPointerleave: handlePointerleave,
    }, props.contentProps)
  })

  const hasPrepend = computed(() => {
    return !!(hasSlot('header:prepend') || icon.value)
  })
  const hasIcon = computed(() => {
    return !!(props.icon || props.status)
  })
  const hasContent = hasSlot('default') || hasSlot('text') || !!(props.text) || hasPrepend.value

  // CLASS & STYLES

  const locationClasses = computed(() => {
    return props.location.split(' ').reduce((acc, loc) => {
      acc[`foxy-snackbar--${loc}`] = true

      return acc
    }, {} as Record<string, any>)
  })
  const snackbarStyles = computed(() => {
    return [
      mainStyles.value,
      props.style
    ] as StyleValue
  })
  const snackbarClasses = computed(() => {
    return [
      'foxy-snackbar',
      {
        'foxy-snackbar--active': isActive.value,
        'foxy-snackbar--multi-line': props.multiLine && !props.vertical,
        'foxy-snackbar--timer': !!props.timer,
        'foxy-snackbar--vertical': props.vertical,
      },
      locationClasses.value,
      positionClasses.value,
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      elevationClasses.value,
      statusClasses.value,
      props.class
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-snackbar {
    $this: &;

    justify-content: center;
    z-index: 10000;
    margin: 8px;
    margin-inline-end: calc(8px + 0px);
    padding: var(--foxy-layout---position-top) var(--foxy-layout---position-right) var(--foxy-layout---position-bottom) var(--foxy-layout---position-left);

    &:not(#{$this}--center) {
      &:not(#{$this}--top) {
        align-items: flex-end;
      }
    }

    :deep(#{$this}__wrapper) {
      align-items: center;
      display: flex;
      max-width: 672px;
      min-height: 48px;
      min-width: 344px;
      overflow: hidden;
      padding: 0;
    }

    &__underlay {
      position: absolute;
    }

    &__content {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 400;
      letter-spacing: 0.0178571429em;
      line-height: 1.425;
      margin-right: auto;
      padding: 14px 16px;
      text-align: initial;
      align-items: center;
      display: flex;
    }

    &__prepend {
      margin-inline-end: 12px;
    }

    &__actions {
      align-items: center;
      align-self: center;
      display: flex;
      margin-inline-end: 8px;

      > .foxy-btn {
        padding: 0 8px;
        min-width: auto;
      }
    }

    &__timer {
      width: 100%;
      position: absolute;
      top: 0;

      :deep(.foxy-progress-linear) {
        transition: 0.2s linear;
      }
    }

    &--bordered {
      :deep(#{$this}__wrapper) {
        border-width: thin;
        border-style: solid;
        box-shadow: none;
      }
    }

    &--rounded {
      :deep(#{$this}__wrapper) {
        border-radius: 4px;
      }
    }

    &--absolute {
      position: absolute;
      z-index: 1;
    }

    &--multi-line {
      #{$this}__wrapper {
        min-height: 68px;
      }
    }

    &--vertical {
      #{$this}__wrapper {
        flex-direction: column;

        #{$this}__actions {
          align-self: flex-end;
          margin-bottom: 8px;
        }
      }
    }

    &--center {
      align-items: center;
      justify-content: center;
    }

    &--top {
      align-items: flex-start;
    }

    &--bottom {
      align-items: flex-end;
    }

    &--left,
    &--start {
      justify-content: flex-start;
    }

    &--right, &--end {
      justify-content: flex-end;
    }
  }
</style>

<style>
  :root {

  }
</style>
