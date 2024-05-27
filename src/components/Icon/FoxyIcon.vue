<template>
  <component
      :is="iconData.component"
      :icon="iconData.icon"
      :aria-hidden="!attrs.onClick"
      :class="iconClasses"
      :size="size"
      :role="attrs.onClick ? 'button' : undefined"
      :style="iconStyles"
      :tag="tag">
    <slot name="default"></slot>
  </component>
</template>

<script lang="ts" setup>
  import { computed, ref, StyleValue, toRef, useAttrs } from 'vue'

  import { useBothColor, useSize, useSlots, useIcon, useBorder, usePadding, useMargin } from '@foxy/composables'

  import { IIconComponentProps } from '@foxy/interfaces'

  import { flattenFragments } from '@foxy/utils'

  const attrs = useAttrs()

  const props = withDefaults(defineProps<IIconComponentProps>(), { tag: 'i' })

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { sizeClasses, sizeStyles } = useSize(props)
  const { hasSlot, slots } = useSlots()
  const { iconData } = useIcon(computed(() => slotIcon.value || props.icon))

  const slotIcon = ref<string>()

  if (hasSlot('default') && slots.default?.()) {
    slotIcon.value = flattenFragments(slots.default?.()).filter(node =>
        node.type === Text && node.children && typeof node.children === 'string'
    )[0]?.children as string
  }

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      colorStyles.value,
      sizeStyles.value,
      borderStyles.value,
      marginStyles.value,
      paddingStyles.value,
      props.style
    ] as StyleValue
  })
  const iconClasses = computed(() => {
    return [
      'foxy-icon',
      {
        'foxy-icon--clickable': !!attrs.onClick
      },
      sizeClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-icon {
    &--size-x-small {
      font-size: 1em;
    }

    &--size-small {
      font-size: 1.25em;
    }

    &--size-default {
      font-size: 1.5em;
    }

    &--size-large {
      font-size: 1.75em;
    }

    &--size-x-large {
      font-size: 2em;
    }
  }
</style>

<style>
  :root {

  }
</style>