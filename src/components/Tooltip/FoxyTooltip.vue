<template>
  <foxy-overlay
      :id="id"
      ref="overlay"
      v-model="isActive"
      :activator-props="activatorProps"
      :class="tooltipClasses"
      :location="location"
      :origin="origin"
      :style="tooltipStyles"
      :transition="transition"
      absolute
      disableGlobalStack
      persistent
      role="tooltip"
      v-bind="{...overlayProps, ...scopeId}">
    <template #activator="{props}">
      <slot name="activator" v-bind="{props}"/>
    </template>

    <template #default>
      <slot name="default">
        <span>{{ text }}</span>
      </slot>
    </template>
  </foxy-overlay>
</template>

<script lang="ts" setup>
  import { FoxyFade, FoxyOverlay, FoxyTranslateScale } from '@foxy/components'

  import { useScopeId } from '@foxy/composables'

  import { OVERLAY_PROPS } from '@foxy/consts'

  import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from '@foxy/enums'

  import { IOverlayProps, ITooltipProps } from '@foxy/interfaces'

  import { TAnchor } from '@foxy/types'

  import { getUid, omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, mergeProps, ref, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ITooltipProps>(), {
    closeOnBack: false,
    location: INLINE.END,
    locationStrategy: LOCATION_STRATEGIES.CONNECTED,
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: 'auto',
    scrim: false,
    scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
    transition: false
  })

  const emits = defineEmits(['update:modelValue'])

  const isActive = useProxiedModel(props, 'modelValue')
  const { scopeId } = useScopeId()

  const uid = getUid()
  const id = computed(() => props.id || `foxy-tooltip-${uid}`)

  const overlay = ref()

  const location = computed(() => {
    return props.location.split(' ').length > 1
        ? props.location
        : props.location + ' center' as TAnchor
  })

  const origin = computed(() => {
    return (
        props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.location.split(' ').length > 1
    ) ? props.origin
        : props.origin + ' center' as TAnchor | 'auto' | 'overlap'
  })

  const transition = computed(() => {
    if (props.transition) return props.transition
    return { component: isActive.value ? FoxyTranslateScale : FoxyFade }
  })

  const activatorProps = computed(() =>
      mergeProps({
        'aria-describedby': id.value,
      }, props.activatorProps)
  )

  const overlayProps = computed(() => {
    const overlayProps = pick(props, Object.keys(OVERLAY_PROPS) as Array<keyof IOverlayProps>)

    return omit(overlayProps, ['activatorProps', 'class', 'style', 'modelValue', 'location', 'origin', 'transition', 'disableGlobalStack', 'absolute', 'persistent'])
  })

  // CLASS & STYLES

  const tooltipStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const tooltipClasses = computed(() => {
    return [
      'foxy-tooltip',
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>

</style>

<style>
  :root {

  }
</style>
