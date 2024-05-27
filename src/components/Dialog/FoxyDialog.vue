<template>
  <foxy-overlay
      ref="overlay"
      v-model="isActive"
      :activator-props="activatorProps"
      :class="dialogClasses"
      :style="dialogStyles"
      aria-modal="true"
      role="dialog"
      v-bind="{...overlayProps, ...scopeId}">
    <template v-if="hasSlot('activator')" #activator="{props}">
      <slot name="activator" v-bind="{props}"/>
    </template>

    <template #default="{isActive}">
      <slot name="default" v-bind="{isActive}">
        <foxy-card v-bind="cardProps">
          <template v-if="hasSlot('loader')" #loader>
            <slot name="loader"/>
          </template>

          <template v-if="hasSlot('header')" #header>
            <slot name="header"/>
          </template>

          <template #header:append>
            <slot name="header:append">
              <foxy-btn
                  :rounded="0"
                  bg-color="transparent"
                  :icon="MDI_ICONS.CLOSE"
                  @click="handleClose"/>
            </slot>
          </template>

          <template v-if="hasPrepend" #header:prepend>
            <slot name="header:prepend">
              <foxy-icon v-if="hasIcon" key="prepend-icon" :icon="icon as TIcon" :size="28"/>
            </slot>
          </template>

          <template v-if="hasSlot('header:title')" #header:title>
            <slot name="header:title"/>
          </template>

          <template v-if="hasSlot('header:subtitle')" #header:subtitle>
            <slot name="header:subtitle"/>
          </template>

          <template v-if="hasSlot('header:content')" #header:content>
            <slot name="header:content"/>
          </template>

          <template v-if="hasSlot('asset')" #asset>
            <slot name="asset"/>
          </template>

          <template v-if="hasSlot('text')" #text>
            <slot name="text"/>
          </template>

          <template #default>
            <slot name="content"/>
            <div ref="endText" v-intersect="handleIntersect"></div>
          </template>

          <template v-if="hasSlot('footer')" #footer>
            <slot name="footer"/>
          </template>
        </foxy-card>
      </slot>
    </template>
  </foxy-overlay>
</template>

<script lang="ts" setup>
  import { FoxyBtn, FoxyCard, FoxyIcon, FoxyOverlay, FoxyTranslateScale } from '@foxy/components'

  import { useScopeId, useSlots, useStatus } from '@foxy/composables'

  import { CARD_PROPS, IN_BROWSER, OVERLAY_PROPS } from '@foxy/consts'

  import { vIntersect } from '@foxy/directives'

  import { MDI_ICONS } from '@foxy/enums'

  import { IDialogProps } from '@foxy/interfaces'
  import { TFoxyOverlay, TIcon } from '@foxy/types'

  import { focusableChildren, keys, omit, pick, useProxiedModel } from '@foxy/utils'

  import { Component, computed, mergeProps, nextTick, ref, StyleValue, watch } from 'vue'

  const props = withDefaults(defineProps<IDialogProps>(), {
    retainFocus: true,
    origin: 'center center',
    scrollStrategy: 'block',
    transition: { component: FoxyTranslateScale as Component },
    zIndex: 2400
  })

  const emits = defineEmits(['update:modelValue', 'isRead', 'click:outside'])

  const isActive = useProxiedModel(props, 'modelValue')
  const { scopeId } = useScopeId()
  const { hasSlot } = useSlots()
  const { icon, statusClasses } = useStatus(props)

  const overlay = ref<TFoxyOverlay>()

  const handleFocusin = (e: FocusEvent) => {
    const before = e.relatedTarget as HTMLElement | null
    const after = e.target as HTMLElement | null

    if (
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)
    ) {
      const focusable = focusableChildren(overlay.value.contentEl)

      if (!focusable.length) return

      const firstElement = focusable[0]
      const lastElement = focusable[focusable.length - 1]

      if (before === firstElement) {
        lastElement.focus()
      } else {
        firstElement.focus()
      }
    }
  }

  if (IN_BROWSER) {
    watch(() => isActive.value && props.retainFocus, (val) => {
      val
          ? document.addEventListener('focusin', handleFocusin)
          : document.removeEventListener('focusin', handleFocusin)
    }, { immediate: true })
  }

  watch(isActive, async (val) => {
    await nextTick()
    if (val) {
      overlay.value!.contentEl?.focus({ preventScroll: true })
    } else {
      overlay.value!.activatorEl?.focus({ preventScroll: true })
    }
  })

  const activatorProps = computed(() => {
    return mergeProps({
      'aria-haspopup': 'dialog',
      'aria-expanded': String(isActive.value),
    }, props.activatorProps)
  })
  const overlayProps = computed(() => {
    const overlayProps = pick(props, keys(OVERLAY_PROPS))

    return omit(overlayProps, ['activatorProps', 'class', 'style', 'modelValue'])
  })
  const cardProps = computed(() => {
    return pick(props, keys(CARD_PROPS))
  })

  const handleClose = () => {
    isActive.value = false
  }
  const handleIntersect = (_isIntersecting: boolean, entries: Array<IntersectionObserverEntry>, _observer: IntersectionObserver) => {
    if (entries[entries.length - 1].isIntersecting) {
      emits('isRead', true)
    }
  }

  const hasPrepend = computed(() => {
    return !!(hasSlot('header:prepend') || icon.value)
  })
  const hasIcon = computed(() => {
    return !!(props.icon || props.status)
  })

  // CLASS & STYLES

  const dialogStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const dialogClasses = computed(() => {
    return [
      'foxy-dialog',
      {
        'foxy-dialog--fullscreen': props.fullscreen,
        'foxy-dialog--scrollable': props.scrollable,
      },
      statusClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-dialog {
    $this: &;

    align-items: center;
    justify-content: center;
    margin: auto;

    > :deep(.foxy-overlay__content) {
      max-height: calc(100% - 48px);
      width: calc(100% - 48px);
      max-width: calc(100% - 48px);
      margin: 24px;

      &,
      > form {
        > .foxy-card {
          display: flex;
          flex: 1 1 100%;
          flex-direction: column;
          max-height: 100%;
          max-width: 100%;
          overflow: hidden;

          .foxy-card__content {
            display: flex;
            flex: 1 1 100%;
            flex-direction: column;
            max-height: 100%;
            max-width: 100%;
            overflow: auto;
          }
        }
      }
    }

    &--fullscreen {
      > :deep(.foxy-overlay__content) {
        border-radius: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow-y: auto;
        top: 0;
        left: 0;

        &,
        > form {
          > .foxy-card,
          > .foxy-sheet {
            min-height: 100%;
            min-width: 100%;
            border-radius: 0;
          }
        }
      }
    }
  }
</style>

<style>

</style>