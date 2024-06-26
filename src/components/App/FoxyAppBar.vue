<template>
  <foxy-toolbar
      :class="toolbarClasses"
      :collapse="isCollapsed"
      :flat="isFlat"
      :style="toolbarStyles"
      v-bind="props">
    <template v-if="hasAppend" #append>
      <slot name="append"></slot>
    </template>

    <template v-if="hasPrepend" #prepend>
      <slot name="prepend">
        <div v-if="hasImage" class="foxy-bar__img">
          <slot name="title">
            <foxy-img v-bind="image"/>
          </slot>
        </div>
        <div v-if="hasTitle" class="foxy-bar__title">
          <slot name="title">
            <foxy-title :text="title" class="foxy-bar__title"/>
          </slot>
        </div>
      </slot>
    </template>

    <template v-if="hasContent" #content>
      <slot name="content"></slot>
    </template>

    <template v-if="hasSlot('default')" #default>
      <slot name="default"></slot>
    </template>
  </foxy-toolbar>
</template>

<script lang="ts" setup>
  import { computed, shallowRef, StyleValue, toRef, watchEffect } from 'vue'

  import { useSlots, useLayoutItem, useScroll, useSsrBoot, useToggleScope} from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'
  import { LAYOUT_POSITION } from '@foxy/enums'

  import { IAppBarProps } from '@foxy/interfaces'

  import { useProxiedModel } from '@foxy/utils'

  import { FoxyImg, FoxyToolbar, FoxyTitle } from '@foxy/components'

  const props = withDefaults(defineProps<IAppBarProps>(), {
    tag: 'header',
    height: 64,
    density: DENSITY.DEFAULT,
    scrollThreshold: 300,
    location: LAYOUT_POSITION.TOP,
    modelValue: true
  })

  const emits = defineEmits(['update:modelValue'])

  const { ssrBootStyles } = useSsrBoot()
  const { hasSlot } = useSlots()

  const hasPrepend = computed(() => {
    return hasTitle || hasImage || hasSlot('prepend')
  })
  const hasContent = computed(() => {
    return hasSlot('content')
  })
  const hasAppend = computed(() => {
    return hasSlot('append')
  })
  const hasTitle = computed(() => {
    return !!(props.title || hasSlot('title'))
  })
  const hasImage = computed(() => {
    return !!(props.image || hasSlot('img'))
  })

  const isActive = useProxiedModel(props, 'modelValue')

  // SCROLL
  const scrollBehavior = computed(() => {
    const behavior = new Set(props.scrollBehavior?.split(' ') ?? [])

    return {
      hide: behavior.has('hide'),
      // fullyHide: behavior.has('fully-hide'),
      inverted: behavior.has('inverted'),
      collapse: behavior.has('collapse'),
      elevate: behavior.has('elevate'),
      fadeImage: behavior.has('fade-image'),
      // shrink: behavior.has('shrink'),
    }
  })
  const canScroll = computed(() => {
    const behavior = scrollBehavior.value

    return (
        behavior.hide ||
        behavior.inverted ||
        behavior.collapse ||
        behavior.elevate ||
        behavior.fadeImage ||
        !isActive.value
    )
  })

  const {
    currentScroll,
    scrollThreshold,
    isScrollingUp,
    scrollRatio,
  } = useScroll(props, { canScroll })
  useToggleScope(computed(() => !!props.scrollBehavior), () => {
    watchEffect(() => {
      if (scrollBehavior.value.hide) {
        if (scrollBehavior.value.inverted) {
          isActive.value = currentScroll.value > scrollThreshold.value
        } else {
          isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value)
        }
      } else {
        isActive.value = true
      }
    })
  })

  const isCollapsed = computed(() => props.collapse || (
      scrollBehavior.value.collapse &&
      (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
  ))
  const isFlat = computed(() => props.flat || (
      scrollBehavior.value.elevate &&
      (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
  ))
  const height = computed(() => {
    if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0

    return props.height ?? 0
  })

  // LAYOUT

  const { layoutItemStyles, layoutIsReady } = useLayoutItem({
    id: props.name,
    order: computed(() => parseInt(props.order as string, 10)),
    position: toRef(props, 'location'),
    layoutSize: height,
    elementSize: shallowRef(undefined),
    active: isActive,
    absolute: toRef(props, 'absolute'),
  })

  // CLASS & STYLES

  const toolbarStyles = computed(() => {
    return [
      layoutItemStyles.value,
      ssrBootStyles.value,
      props.style
    ] as StyleValue
  })
  const toolbarClasses = computed(() => {
    return [
      'foxy-app-bar',
      `foxy-app-bar--${props.location}`,
      props.class
    ]
  })

  defineExpose({layoutIsReady})
</script>
