<template>
  <component
      :is="tag"
      :class="listGroupClasses"
      :style="listGroupStyles">
    <slot name="default">
      <foxy-list-group-activator class="foxy-list-group__activator">
        <slot name="activator"
              v-bind="{ events: activatorEvents, props: activatorProps, isOpen: isOpen, toggleIcon: toggleIcon }">
          <foxy-list-item
              :active="isOpen"
              :appendIcon="appendActivatorIcon"
              :prependIcon="prependActivatorIcon"
              :title="title"
              :value="value"
              v-bind="activatorProps"
              v-on="activatorEvents"/>
        </slot>
      </foxy-list-group-activator>

      <foxy-transition :transition="transition" :disabled="!isBooted">
        <div v-if="isOpen" :aria-labelledby="id" class="foxy-list-group__items" role="group">
          <slot name="items"/>
        </div>
      </foxy-transition>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyTransition, FoxyExpandY, FoxyListGroupActivator } from '@foxy/components'

  import {
    useBorder,
    useBothColor,
    useList,
    useMargin,
    useNestedItem,
    usePadding,
    useRounded,
    useSsrBoot
  } from '@foxy/composables'

  import { IListActivatorEvents, IListActivatorProps, IListGroupProps } from '@foxy/interfaces'

  import { computed, ref, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IListGroupProps>(), {
    tag: 'div',
    collapseIcon: '$collapse',
    expandIcon: '$expand'
  })

  const emits = defineEmits(['click:activator'])

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { isOpen, open, id: _id } = useNestedItem(toRef(props, 'value'), true)
  const id = computed(() => `foxy-list-group--id-${String(_id.value)}`)
  const list = useList()
  const { isBooted } = useSsrBoot()
  const transition = ref({ component: FoxyExpandY })

  const toggleIcon = computed(() => {
    if (isOpen.value) {
      return props.collapseIcon
    }

    return props.expandIcon
  })
  const activatorProps = computed<IListActivatorProps>(() => {
    return {
      class: 'foxy-list-group__header',
      id: id.value
    } as IListActivatorProps
  })
  const activatorEvents = computed<IListActivatorEvents>(() => {
    return {
      'click': handleClick,
    }
  })
  const prependActivatorIcon = computed(() => {
    return props.prependIcon
  })
  const appendActivatorIcon = computed(() => {
    return props.appendIcon || toggleIcon.value
  })

  const handleClick = (e: Event) => {
    emits('click:activator', { open: !isOpen.value, event: e })

    open(!isOpen.value, e)
  }

  // CLASS & STYLES

  const listGroupStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const listGroupClasses = computed(() => {
    return [
      'foxy-list-group',
      {
        'foxy-list-group--prepend': list && list.hasPrepend.value,
        'foxy-list-group--append': list && list.hasAppend.value,
        'foxy-list-group--fluid': props.fluid,
        'foxy-list-group--open': isOpen.value,
      },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-list-group {
    $this: &;

    &--fluid {
      --foxy-list-group---list-indent-size: var(--foxy-list-group--fluid---list-indent-size);

      &#{$this}--prepend {
        --foxy-list-group---parent-padding: var(--foxy-list---indent-padding);
      }
    }

    &--prepend {
      --foxy-list-group---parent-padding: calc(var(--foxy-list---indent-padding) + var(--foxy-list-group---prepend-width));
    }

    &__items {
      --foxy-list---indent-padding: calc(var(--foxy-list-group---parent-padding) + var(--foxy-list-group---list-indent-size));
    }

    &__header {
      .foxy-list-item {
        $item: &;

        &--active {
          &:not(:focus-visible) {
            #{$item}__overlay {
              opacity: var(--foxy-list-group__header--active---opacity);
            }
          }

          &:hover {
            #{$item}__overlay {
              opacity: var(--foxy-list-group__header--active--hover---opacity);
            }
          }
        }
      }
    }
  }
</style>

<style>
  :root {
    --foxy-list-group---list-indent-size: 16px;
    --foxy-list-group---parent-padding: var(--foxy-list---indent-padding);
    --foxy-list-group---prepend-width: 16px;

    --foxy-list-group--fluid---list-indent-size: 0px;

    --foxy-list-group__header--active---opacity: 0;
    --foxy-list-group__header--active--hover---opacity: 0.5;
  }
</style>
