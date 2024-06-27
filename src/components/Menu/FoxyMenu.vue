<template>
  <foxy-overlay
    :id="id"
    ref="overlay"
    v-model="isActive"
    :activator-props="activatorProps"
    :class="menuClasses"
    :style="menuStyles"
    absolute
    role="menu"
    v-bind="{...overlayProps, ...scopeId}"
    @keydown="handleKeydown"
    @click:outside="handleClickOutside">
    <template #activator="{props}">
      <slot name="activator" v-bind="{props}"/>
    </template>

    <template #default>
      <slot name="default">
        <foxy-list class="foxy-menu__list">
          <foxy-list-subheader v-if="title" class="foxy-menu__title">{{ title }}</foxy-list-subheader>
          <foxy-list-group class="foxy-menu__items">
            <template v-for="(item, index) in items" :key="index">
              <foxy-list-item
                v-if="!hasChilds(item)"
                class="foxy-menu__item"
                v-bind="item"/>
              <foxy-menu
                v-else
                v-bind="{...item, ...overlayProps, offset:[8, 8]}"
              >
                <template #activator="{props}">
                  <foxy-list-item
                    :append-icon="MDI_ICONS.CHEVRON_RIGHT"
                    class="foxy-menu__item"
                    v-bind="{...props, ...item}"/>
                </template>
              </foxy-menu>
            </template>
          </foxy-list-group>
        </foxy-list>
      </slot>
    </template>
  </foxy-overlay>
</template>

<script lang="ts" setup>
  import { FoxyListGroup, FoxyListSubheader, FoxyOverlay, FoxyTranslateScale } from '@foxy/components'

  import { useScopeId, useVModel } from '@foxy/composables'

  import { FOXY_MENU_KEY, OVERLAY_PROPS } from '@foxy/consts'

  import { INLINE, KEYBOARD_VALUES, LOCATION_STRATEGIES, MDI_ICONS, SCROLL_STRATEGIES } from '@foxy/enums'

  import { IItemProps, IMenuProps } from '@foxy/interfaces'

  import { TFoxyOverlay } from '@foxy/types'

  import { focusableChildren, focusChild, getNextElement, getUid, keys, omit, pick } from '@foxy/utils'

  import { computed, inject, mergeProps, nextTick, provide, ref, shallowRef, StyleValue, watch } from 'vue'

  const props = withDefaults(defineProps<IMenuProps>(), {
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: LOCATION_STRATEGIES.CONNECTED,
    openDelay: 300,
    scrim: false,
    openOnClick: true,
    location: INLINE.RIGHT,
    scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
    width: 200,
    offset: 8,
    transition: { component: FoxyTranslateScale }
  })

  const emits = defineEmits(['update:modelValue'])

  const isActive = useVModel(props, 'modelValue')
  const { scopeId } = useScopeId()

  const uid = getUid()
  const id = computed(() => props.id || `foxy-menu--${uid}`)

  const overlay = ref<TFoxyOverlay>()

  const parent = inject(FOXY_MENU_KEY, null)
  const openChildren = shallowRef(0)
  provide(FOXY_MENU_KEY, {
    register () {
      ++openChildren.value
    },
    unregister () {
      --openChildren.value
    },
    closeParents () {
      setTimeout(() => {
        if (!openChildren.value) {
          isActive.value = false
          parent?.closeParents()
        }
      }, 40)
    },
  })

  const handleFocusIn = async (e: FocusEvent) => {
    const before = e.relatedTarget as HTMLElement | null
    const after = e.target as HTMLElement | null

    await nextTick()

    if (
      isActive.value &&
      before !== after &&
      overlay.value?.contentEl &&
      // We're the topmost menu
      overlay.value?.globalTop &&
      // It isn't the document or the menu body
      ![document, overlay.value.contentEl].includes(after!) &&
      // It isn't inside the menu body
      !overlay.value.contentEl.contains(after)
    ) {
      const focusable = focusableChildren(overlay.value.contentEl)
      focusable[0]?.focus()
    }
  }

  watch(isActive, (val) => {
    if (val) {
      parent?.register()
      document.addEventListener('focusin', handleFocusIn, { once: true })
    } else {
      parent?.unregister()
      document.removeEventListener('focusin', handleFocusIn)
    }
  })

  const handleClickOutside = () => {
    parent?.closeParents()
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return

    if (e.key === KEYBOARD_VALUES.TAB) {
      const nextElement = getNextElement(
        focusableChildren(overlay.value?.contentEl as Element, false),
        e.shiftKey ? 'prev' : 'next',
        (el: HTMLElement) => el.tabIndex >= 0
      )
      if (!nextElement) {
        isActive.value = false
        overlay.value?.activatorEl?.focus()
      }
    }
  }
  const handleActivatorKeydown = (e: KeyboardEvent) => {
    if (props.disabled) return

    const el = overlay.value?.contentEl
    if (el && isActive.value) {
      if (e.key === KEYBOARD_VALUES.DOWN) {
        e.preventDefault()
        focusChild(el, 'next')
      } else if (e.key === KEYBOARD_VALUES.UP) {
        e.preventDefault()
        focusChild(el, 'prev')
      }
    } else if ([KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP].includes(e.key)) {
      isActive.value = true
      e.preventDefault()
      setTimeout(() => setTimeout(() => handleActivatorKeydown(e)))
    }
  }

  const activatorProps = computed(() => {
    return mergeProps({
      'aria-haspopup': 'menu',
      'aria-expanded': String(isActive.value),
      'aria-owns': id.value,
      onKeydown: handleActivatorKeydown,
    }, props.activatorProps)
  })

  const overlayProps = computed(() => {
    const overlayProps = pick(props, keys(OVERLAY_PROPS))

    return omit(overlayProps, ['activatorProps', 'class', 'style', 'modelValue', 'absolute'])
  })

  const hasChilds = (item: IItemProps) => {
    return item?.items
  }

  // CLASS & STYLES

  const menuStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const menuClasses = computed(() => {
    return [
      'foxy-menu',
      props.class,
    ]
  })

  defineExpose({ openChildren })
</script>

<style lang="scss" scoped>
  .foxy-menu {

  }
</style>

<style>
  :root {

  }
</style>