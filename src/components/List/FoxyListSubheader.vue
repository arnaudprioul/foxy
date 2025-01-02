<template>
  <component
      :is="tag"
      :class="listSubheaderClasses"
      :style="listSubheaderStyles">
    <div v-if="hasText" class="foxy-list-subheader__text">
      <slot name="default" v-bind="{title}">
        {{ title }}
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded, useSlots } from '@foxy/composables'

  import { IListSubheader } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IListSubheader>(), {tag: 'div'})

  const {filterProps} = useProps<IListSubheader>(props)

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { hasSlot } = useSlots()

  const hasText = computed(() => {
    return hasSlot('default') || props.title
  })

  // CLASS & STYLES

  const listSubheaderStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const listSubheaderClasses = computed(() => {
    return [
      'foxy-list-subheader',
      {
        'foxy-list-subheader--inset': props.inset,
        'foxy-list-subheader--sticky': props.sticky,
      },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="css" scoped>
  .foxy-list-subheader {
    align-items: center;
    background: inherit;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    display: flex;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.375rem;
    padding-inline-end: 16px;
    min-height: 40px;
    transition: 0.2s min-height cubic-bezier(0.4, 0, 0.2, 1);

    &__text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &--inset {
      --foxy-list---indent-padding: 32px;
    }

    &--sticky {
      background: inherit;
      left: 0;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
</style>

<style>

</style>
