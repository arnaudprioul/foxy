<template>
  <teleport
      v-if="isActive"
      :to="teleportDrawer"
  >
    <component
        :is="tag"
        :ref="rootEl"
        :class="drawerClasses"
        :style="drawerStyles"
        v-bind="{...scopeId, ...$attrs}"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
      <div class="foxy-drawer__wrapper">
        <slot name="wrapper">
          <div
              v-if="hasPrepend"
              class="foxy-drawer__prepend"
          >
            <slot name="prepend"/>
          </div>

          <div
              v-if="hasContent"
              class="foxy-drawer__content"
          >
            <slot name="default"/>
          </div>

          <div
              v-if="hasAppend"
              class="foxy-drawer__append"
          >
            <slot name="append"/>
          </div>
        </slot>
      </div>
    </component>
    <foxy-overlay-scrim
        :active="isTemporary && (isDragging || isActive && !!scrim)"
        :scrim="scrim"
        :style="scrimStyles"
        v-bind="scopeId"
        @click="handleClickScrim"
    />
  </teleport>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyOverlayScrim } from '@foxy/components'

  import {
    useBackgroundColor,
    useBorder,
    useDensity,
    useElevation,
    useLayoutItem,
    useMargin,
    usePadding,
    useProps,
    useRounded,
    useRouter,
    useScopeId,
    useSsrBoot,
    useSticky,
    useToggleScope,
    useTouch,
    useVModel
  } from '@foxy/composables'

  import { INLINE } from '@foxy/enums'

  import { IDrawerProps } from '@foxy/interfaces'

  import { getUid, int } from "@foxy/utils"

  import {
    computed,
    ComputedRef,
    nextTick,
    onBeforeMount,
    Ref,
    ref,
    shallowRef,
    StyleValue,
    toRef,
    watch,
    useSlots
  } from 'vue'

  const props = withDefaults(defineProps<IDrawerProps>(), {
    tag: 'nav',
    permanent: null,
    rail: null,
    railWidth: 56,
    scrim: true,
    width: 256,
    location: INLINE.LEFT,
    modelValue: true
  })

  const emits = defineEmits(['update:rail'])

  const { filterProps } = useProps<IDrawerProps>(props)

  const { backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const slots = useSlots()
  const router = useRouter()
  const { ssrBootStyles } = useSsrBoot()
  const { scopeId } = useScopeId()

  const isActive = useVModel(props, 'modelValue', false, v => !!v)
  const rootEl = ref<HTMLElement>()
  const isHovering = shallowRef(false)

  const width = computed(() => {
    return (props.rail && props.expandOnHover && isHovering.value)
        ? Number(props.width)
        : Number(props.rail ? props.railWidth : props.width)
  })
  const location = computed(() => {
    return props.location as 'left' | 'right' | 'bottom'
  })
  const isTemporary = computed(() => !props.permanent && (props.temporary))
  const isSticky = computed(() => {
    return props.sticky && !isTemporary.value && location.value !== 'bottom'
  })

  useToggleScope(() => props.expandOnHover && props.rail != null, () => {
    watch(isHovering, val => emits('update:rail', !val))
  })
  useToggleScope(() => !props.disableResizeWatcher, () => {
    watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)))
  })
  useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
    watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false))
  })

  watch(() => props.permanent, val => {
    if (val) isActive.value = true
  })

  onBeforeMount(() => {
    if (props.modelValue != null || isTemporary.value) return

    isActive.value = props.permanent as boolean
  })

  // DRAG

  const { isDragging, dragProgress, dragStyles } = useTouch({
    isActive: isActive as Ref<boolean>,
    isTemporary,
    width,
    touchless: toRef(props, 'touchless'),
    position: location
  })

  // LAYOUT

  const layoutSize = computed(() => {
    const size = isTemporary.value ? 0
        : props.rail && props.expandOnHover ? Number(props.railWidth)
            : width.value

    return isDragging.value ? size * dragProgress.value : size
  })

  const { layoutItemStyles, layoutItemScrimStyles, layoutId } = useLayoutItem({
    id: props.name,
    order: computed(() => int(props.order as string || getUid().toString() as string)),
    position: location,
    layoutSize,
    elementSize: width,
    active: computed(() => isActive.value || isDragging.value) as ComputedRef<boolean>,
    disableTransitions: computed(() => isDragging.value),
    absolute: computed(() =>
        props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
    )
  })

  const teleportDrawer = computed(() => {
    return `#${layoutId.value} .foxy-layout__wrapper`
  })

  const { isStuck, stickyStyles } = useSticky({ rootEl, isSticky, layoutItemStyles })

  // SCRIM
  const scrimStyles = computed(() => ({
    ...isDragging.value ? {
      opacity: dragProgress.value * 0.2,
      transition: 'none'
    } : undefined,
    ...layoutItemScrimStyles.value
  }))

  const handleClickScrim = () => {
    isActive.value = false
  }

  // HOVER

  const handleMouseEnter = () => {
    isHovering.value = true
  }
  const handleMouseLeave = () => {
    isHovering.value = false
  }

  // SLOTS

  const hasPrepend = computed(() => {
    return slots.prepend
  })
  const hasContent = computed(() => {
    return slots.default
  })
  const hasAppend = computed(() => {
    return slots.append
  })

  // CLASSES & STYLES

  const drawerStyles = computed(() => {
    return [
      backgroundColorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      layoutItemStyles.value,
      dragStyles.value,
      ssrBootStyles.value,
      stickyStyles.value,
      props.style
    ] as StyleValue
  })
  const drawerClasses = computed(() => {
    return [
      'foxy-drawer',
      `foxy-drawer--${location.value}`,
      {
        'foxy-drawer--expand-on-hover': props.expandOnHover,
        'foxy-drawer--floating': props.floating,
        'foxy-drawer--is-hovering': isHovering.value,
        'foxy-drawer--rail': props.rail,
        'foxy-drawer--temporary': isTemporary.value,
        'foxy-drawer--active': isActive.value,
        'foxy-drawer--sticky': isSticky.value
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })
</script>

<style
    lang="scss"
    scoped
>
.foxy-drawer {
  -webkit-overflow-scrolling: touch;

  display: var(--foxy-drawer--display);
  flex-direction: var(--foxy-drawer--flex-direction);

  height: var(--foxy-drawer--height);
  max-width: var(--foxy-drawer--max-width);
  width: var(--foxy-drawer---width);

  pointer-events: var(--foxy-drawer--pointer-events);

  transform: var(--foxy-layout---transform);
  transition-duration: var(--foxy-drawer--transition-duration);
  transition-property: var(--foxy-drawer--transition-property);
  transition-timing-function: var(--foxy-drawer--transition-timing-function);

  position: var(--foxy-layout---position, var(--foxy-drawer--position));
  z-index: var(--foxy-layout---zIndex, 1000);

  border-color: var(--foxy-drawer--border-color);
  border-style: var(--foxy-drawer--border-color);
  border-width: var(--foxy-drawer--border-width);
  border-radius: var(--foxy-drawer--border-radius);

  background: var(--foxy-drawer--background);
  box-shadow: var(--foxy-drawer--box-shadow);
  color: var(--foxy-drawer--color);

  &--bordered {
    --foxy-drawer--border-width: thin;
    --foxy-drawer--box-shadow: none;
  }

  &--top {
    --foxy-drawer--border-bottom-width: thin;

    top: 0;
    border-bottom-width: var(--foxy-drawer--border-bottom-width);
  }

  &--bottom {
    --foxy-drawer--border-top-width: thin;

    left: 0;
    border-top-width: var(--foxy-drawer--border-top-width);
  }

  &--left {
    --foxy-drawer--border-right-width: thin;

    top: 0;
    left: 0;
    right: auto;

    border-right-width: var(--foxy-drawer--border-right-width);
  }

  &--right {
    --foxy-drawer--border-left-width: thin;

    top: 0;
    left: auto;
    right: 0;

    border-left-width: var(--foxy-drawer--border-left-width);
  }

  &--floating {
    border: none;
  }

  &--temporary {
    --foxy-drawer--box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  }

  &--sticky {
    --foxy-drawer--height: auto;
    --foxy-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right;
  }

  &:deep(.foxy-list) {
    overflow: hidden;
  }

  &__content {
    flex: 0 1 auto;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;

    img {
      height: inherit;
      object-fit: cover;
      width: inherit;
    }
  }

  &__scrim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.2;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  &__prepend,
  &__append {
    flex: none;
    overflow: hidden;
  }
}
</style>

<style>
:root {
  --foxy-drawer--display: flex;
  --foxy-drawer--flex-direction: column;

  --foxy-drawer--border-top-width: 0;
  --foxy-drawer--border-left-width: 0;
  --foxy-drawer--border-bottom-width: 0;
  --foxy-drawer--border-right-width: 0;
  --foxy-drawer--border-width: var(--foxy-drawer--border-top-width) var(--foxy-drawer--border-left-width) var(--foxy-drawer--border-bottom-width) var(--foxy-drawer--border-right-width);
  --foxy-drawer--border-color: rgba(0, 0, 0, 0.87);
  --foxy-drawer--border-style: solid;
  --foxy-drawer--border-start-start-radius: 0;
  --foxy-drawer--border-start-end-radius: 0;
  --foxy-drawer--border-end-start-radius: 0;
  --foxy-drawer--border-end-end-radius: 0;
  --foxy-drawer--border-radius: var(--foxy-drawer--border-start-start-radius) var(--foxy-drawer--border-start-end-radius) var(--foxy-drawer--border-end-start-radius) var(--foxy-drawer--border-end-end-radius);

  --foxy-drawer--position: absolute;

  --foxy-drawer--transition-duration: 0.2s;
  --foxy-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;
  --foxy-drawer--transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  --foxy-drawer--height: 100%;
  --foxy-drawer--width: 100%;
  --foxy-drawer--max-width: 100%;

  --foxy-drawer--pointer-events: auto;

  --foxy-drawer--color: rgba(0, 0, 0, 0.87);
  --foxy-drawer--box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
  --foxy-drawer--background: rgb(255, 255, 255);
}
</style>
