<template>
  <component
    :is="tag"
    ref="root"
    :class="parallaxClasses"
    :style="parallaxStyles"
    @mouseenter="handleMovementStart"
    @mouseleave="handleMovementStop"
    @mousemove="handleMovement"
  >
    <slot name="default"/>
    <audio
      v-if="audio"
      ref="audioRef"
      type="audio/mpeg"
      @ended="handleStop"
    >
      <source :src="audio">
    </audio>
  </component>
</template>

<script lang="ts" setup>
  import {
    useAudio,
    useBorder,
    useDimension,
    useDisplay,
    useElevation,
    useMargin,
    usePadding,
    useRounded,
    useThrottleFn
  } from '@foxy/composables'

  import { FOXY_PARALLAX_KEY } from '@foxy/consts'

  import { PARALLAX_EVENT } from '@foxy/enums'

  import { IBox, IParallaxProps } from '@foxy/interfaces'

  import { getCenter, getTargetBox, inViewport } from '@foxy/utils'

  import { computed, onBeforeUnmount, onMounted, provide, ref, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IParallaxProps>(), {
    duration: 1000,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    perspective: 1000,
    tag: 'div',
    event: PARALLAX_EVENT.MOVE,
    active: true
  })

  const { audioRef, audioData, onStop: handleStop } = useAudio(props)
  const { platform } = useDisplay()
  const { dimensionStyles } = useDimension(props)
  const { borderStyles, borderClasses } = useBorder(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { elevationClasses } = useElevation(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  const root = ref<HTMLElement>()

  const isMoving = ref(false)
  const leftOnce = ref(false)
  const shape = ref<IBox | DOMRect | null>(null)
  const movement = ref({
    x: 0,
    y: 0,
  })
  const data = ref()

  const isTouch = computed(() => {
    return platform.value.touch
  })
  const eventActions = computed(() => {
    return {
      move: {
        action: mouseMovement,
        condition: isMoving.value && !isTouch.value,
        type: isTouch.value ? 'deviceorientation' : null,
      },
      scroll: {
        action: scrollMovement,
        condition: !!shape.value?.height,
        type: 'scroll',
      },
      orientation: {
        action: orientationElement,
        condition: props.event === 'move' && isTouch.value,
        type: 'deviceorientation',
      },
    }
  })
  const eventMap = computed<{ move: any, scroll: any, orientation: any }>(() => {
    return {
      orientation: 'deviceorientation',
      scroll: 'scroll',
      move: isTouch.value ? 'deviceorientation' : null,
    }
  })

  const mouseMovement = ({ target, event }: { target: IBox | DOMRect, event: MouseEvent }) => {
    const x = event.clientX
    const y = event.clientY

    const relativeX = x - target.left
    const relativeY = y - target.top

    const center = getCenter(target)

    const mouseMovementX = relativeX / center.x
    const mouseMovementY = relativeY / center.y

    return {
      x: mouseMovementX,
      y: mouseMovementY,
      target,
    }
  }
  const scrollMovement = ({ target }: { target: IBox | DOMRect }) => {
    const x = window.scrollX
    const y = window.scrollY

    const relativeX = x - target.left
    const relativeY = y - target.top

    const center = getCenter(target)

    const mouseMovementX = relativeX / center.x
    const mouseMovementY = relativeY / center.y

    return {
      x: mouseMovementX,
      y: mouseMovementY,
      target,
    }
  }
  const orientationElement = ({ event, target }: { target: IBox | DOMRect, event: DeviceOrientationEvent }) => {
    const x = event.gamma ?? 1 / 45
    const y = event.beta ?? 1 / 90

    return { x, y, target }
  }

  const handleMovement = useThrottleFn((event: MouseEvent & DeviceOrientationEvent) => {
    if (!props.active && !root.value) return

    if (!isMoving.value && !leftOnce.value) {
      // fixes the specific case when mouseenter didn't trigger on page refresh
      handleMovementStart()
    }

    shape.value = getTargetBox(root.value)
    const isInViewport = inViewport(shape.value)
    const condition = eventActions.value[props.event].condition
    const action = eventActions.value[props.event].action

    if (isInViewport && condition) {
      movement.value = action({
        target: shape.value,
        event,
      })
      data.value = { x: event.clientX, y: event.clientY }
    }
  }, 100)
  const addEvents = () => {
    if (eventMap.value[props.event]) {
      window.addEventListener(
        eventMap.value[props.event],
        handleMovement,
        true,
      )
    }
  }
  const removeEvents = () => {
    if (eventMap.value[props.event]) {
      window.removeEventListener(
        eventMap.value[props.event],
        handleMovement,
        true,
      )
    }
  }

  const handleMovementStart = () => {
    if (!props.active) return

    isMoving.value = true
  }
  const handleMovementStop = () => {
    if (!props.active) return

    // fixes the specific case when mouseenter didn't trigger on page refresh
    leftOnce.value = true
    isMoving.value = false
  }

  onMounted(() => {
    addEvents()
  })

  onBeforeUnmount(() => {
    removeEvents()
  })

  provide(FOXY_PARALLAX_KEY, {
    audioData,
    event: toRef(props.event),
    eventData: data,
    isMoving: toRef(isMoving.value || props.event === PARALLAX_EVENT.SCROLL),
    movement,
    duration: toRef(props.duration),
    easing: toRef(props.easing),
    shape
  })

  // CLASS & STYLES

  const parallaxStyles = computed(() => {
    return [
      dimensionStyles.value,
      borderStyles.value,
      roundedStyles.value,
      paddingStyles.value,
      marginStyles.value,
      {
        perspective: `${props.perspective}px`
      },
      props.style
    ] as StyleValue
  })
  const parallaxClasses = computed(() => {
    return [
      'foxy-parallax',
      borderClasses.value,
      roundedClasses.value,
      elevationClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-parallax {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
</style>
