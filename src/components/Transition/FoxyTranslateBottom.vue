<template>
  <component
      :is="tag"
      :name="name"
      v-bind="bind">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useCssTransition } from '@foxy/composables'

  import { ITransitionProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ITransitionProps>(), {
    name: 'foxy-transition--translate-bottom'
  })

  const { name, tag, bind } = useCssTransition(props)
</script>

<style lang="scss">
  .foxy-transition--translate-bottom {
    &-enter-active {
      transition-duration: 225ms;
      transition-timing-function: cubic-bezier(0.0, 0, 0.2, 1);
    }

    &-leave-active {
      transition-duration: 125ms;
      transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    }

    &-enter-active,
    &-leave-active {
      transition-property: transform, opacity;
      pointer-events: none;
    }

    &-enter-from, &-leave-to {
      transform: translateY(calc(50vh + 50%));
    }
  }
</style>