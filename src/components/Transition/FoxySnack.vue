<template>
  <component
      :is="tag"
      :name="name"
      v-bind="transitionProps">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useCssTransition } from '@foxy/composables'

  import { ITransitionProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ITransitionProps>(), {
    name: 'foxy-transition--snack'
  })

  const { name, tag, transitionProps } = useCssTransition(props)
</script>

<style lang="scss">
  .foxy-transition--snack {
    &-enter-active,
    &-leave-active {
      transition-duration: .15s;
      transition-timing-function: cubic-bezier(0.0, 0, 0.2, 1);
    }

    &-enter-active {
      transition-property: opacity, transform;
    }

    &-enter-from {
      opacity: 0;
      transform: scale(.8);
    }

    &-leave-active {
      transition-property: opacity;
    }

    &-leave-to {
      opacity: 0;
    }
  }
</style>