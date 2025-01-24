<template>
  <slot name="activator" v-bind="activatorProps"/>
  <template v-if="isMounted && hasContent">
    <teleport :disabled="!teleportTarget" :to="teleportTarget">
      <div
          ref="root"
          :class="overlayClasses"
          :style="overlayStyles"
          v-bind="{ ...scopeId, ...$attrs }">
        <foxy-overlay-scrim
            ref="scrimEl"
            :active="isActive && !!scrim"
            :scrim="scrim"
            v-bind="{...scrimEvents, ...scrimColor}"/>
        <foxy-transition
            :target="target"
            :transition="transition"
            appear
            persisted
            @after-leave="handleAfterLeave">
          <div
              v-show="isActive"
              ref="contentEl"
              v-click-outside="{ handler: handleClickOutside, closeConditional, include: () => [activatorEl] }"
              :class="overlayContentClasses"
              :style="overlayContentStyles"
              v-bind="{ ...contentEvents, ...contentProps }">
            <slot name="default" v-bind="{isActive}"/>
          </div>
        </foxy-transition>
      </div>
    </Teleport>
  </template>
</template>

<script lang="ts" setup>
  import { FoxyFade, FoxyOverlayScrim, FoxyTransition } from '@foxy/components'

  import {
    useActivator,
    useBackButton,
    useBackgroundColor,
    useDimension,
    useHydration,
    useLazy,
    useLocationStrategies,
    useProps,
    useRouter,
    useRtl,
    useScopeId,
    useScrollStrategies,
    useStack,
    useTeleport,
    useToggleScope,
    useVModel
  } from '@foxy/composables'

  import { IN_BROWSER } from '@foxy/consts'

  import { vClickOutside } from '@foxy/directives'

  import { BLOCK, EASING, KEYBOARD_VALUES, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from '@foxy/enums'

  import { IOverlayProps } from '@foxy/interfaces'

  import { TFoxyOverlayScrim } from "@foxy/types"

  import { animate, convertToUnit, getScrollParent } from '@foxy/utils'

  import { computed, mergeProps, onBeforeUnmount, ref, StyleValue, toRef, watch } from 'vue'

  const props = withDefaults(defineProps<IOverlayProps>(), {
    scrim: true,
    zIndex: 2000,
    closeOnBack: true,
    locationStrategy: LOCATION_STRATEGIES.STATIC,
    location: BLOCK.BOTTOM,
    origin: 'auto',
    scrollStrategy: SCROLL_STRATEGIES.BLOCK,
    transition: { component: FoxyFade }
  })

  const emits = defineEmits(['click:outside', 'update:modelValue', 'afterLeave', 'keydown'])

  const { filterProps } = useProps<IOverlayProps>(props)

  const model = useVModel(props, 'modelValue')
  const isActive = computed({
    get: () => model.value,
    set: v => {
      if (!(v && props.disabled)) model.value = v
    }
  })
  const { teleportTarget } = useTeleport(computed(() => props.attach || props.contained))
  const { hasContent, onAfterLeave } = useLazy(props, isActive)
  const { globalTop, localTop, stackStyles } = useStack(isActive, toRef(props, 'zIndex'), props.disableGlobalStack)
  const {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  } = useActivator(props, { isActive, isTop: localTop })
  const { dimensionStyles } = useDimension(props)
  const isMounted = useHydration()
  const { scopeId } = useScopeId()
  const { rtlClasses } = useRtl()

  watch(() => props.disabled, (v) => {
    if (v) isActive.value = false
  })

  const root = ref<HTMLElement>()
  const contentEl = ref<HTMLElement>()
  const scrimEl = ref<TFoxyOverlayScrim>()
  const { contentStyles, updateLocation } = useLocationStrategies(props, {
    contentEl,
    target,
    isActive
  })
  const overlayContentStyles = computed(() => {
    return [
      dimensionStyles.value,
      contentStyles.value
    ]
  })
  const overlayContentClasses = computed(() => {
    return [
      'foxy-overlay__content',
      props.contentClass
    ]
  })
  useScrollStrategies(props, {
    root,
    contentEl,
    targetEl,
    isActive,
    updateLocation
  })

  // CLICK OUTSIDE

  const handleClickOutside = (e: MouseEvent) => {
    emits('click:outside', e)

    if (!props.persistent) isActive.value = false
    else animateClick()
  }

  const closeConditional = () => {
    return isActive.value && globalTop.value
  }

  // KEYDOWN EVENT

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === KEYBOARD_VALUES.ESC && globalTop.value) {
      if (!props.persistent) {
        isActive.value = false
        if (contentEl.value?.contains(document.activeElement)) {
          activatorEl.value?.focus()
        }
      } else animateClick()
    }
  }

  IN_BROWSER && watch(isActive, val => {
    if (val) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    if (!IN_BROWSER) return

    window.removeEventListener('keydown', handleKeydown)
  })

  // LEAVING

  const router = useRouter()
  useToggleScope(() => props.closeOnBack, () => {
    useBackButton(router, (next) => {
      if (globalTop.value && isActive.value) {
        next(false)
        if (!props.persistent) isActive.value = false
        else animateClick()
      } else {
        next()
      }
    })
  })

  const top = ref<number>()
  watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
    if (val) {
      const scrollParent = getScrollParent(root.value)
      if (scrollParent && scrollParent !== document.scrollingElement) {
        top.value = scrollParent.scrollTop
      }
    }
  })

  // Add a quick "bounce" animation to the content
  const animateClick = () => {
    if (props.noClickAnimation) return

    contentEl.value && animate(contentEl.value, [
      { transformOrigin: 'center' },
      { transform: 'scale(1.03)' },
      { transformOrigin: 'center' }
    ], {
      duration: 150,
      easing: EASING.STANDARD
    })
  }

  const handleAfterLeave = () => {
    onAfterLeave()
    emits('afterLeave')
  }

  // SCRIM

  const scrimColor = useBackgroundColor(computed(() => {
    return typeof props.scrim === 'string' ? props.scrim : null
  }))

  // ACTIVATOR

  const activatorProps = computed(() => {
    return {
      isActive: isActive.value,
      props: mergeProps({ ref: activatorRef, targetRef }, activatorEvents.value, props.activatorProps)
    }
  })

  // CLASS & STYLES

  const overlayStyles = computed(() => {
    return [
      stackStyles.value,
      { top: convertToUnit(top.value) },
      props.style
    ] as StyleValue
  })
  const overlayClasses = computed(() => {
    return [
      'foxy-overlay',
      {
        'foxy-overlay--absolute': props.absolute || props.contained,
        'foxy-overlay--active': isActive.value,
        'foxy-overlay--contained': props.contained
      },
      rtlClasses.value,
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    activatorEl,
    scrimEl,
    target,
    animateClick,
    contentEl,
    globalTop,
    localTop,
    updateLocation,
    filterProps
  })

</script>

<style lang="scss" scoped>
.foxy-overlay {
  $this: &;

  border-radius: inherit;
  display: flex;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;

  &__content {
    outline: none;
    position: absolute;
    pointer-events: auto;
    contain: layout;
  }

  &__scrim {
    pointer-events: auto;
    background: rgb(255, 255, 255);
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0.32;
    position: fixed;
    right: 0;
    top: 0;
  }

  &--absolute {
    position: absolute;
  }

  &--contained {
    #{$this}__scrim {
      position: absolute;
    }
  }

  &--scroll-blocked {
    padding-inline-end: 0px;
  }
}
</style>

<style>

</style>
