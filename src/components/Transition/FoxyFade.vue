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
    name: 'foxy-transition--fade'
  })

  const { name, tag, transitionProps } = useCssTransition(props)
</script>

<style lang="scss">
  .foxy-transition--fade{
    &-enter-active {
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    &-leave-active {
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    &-move {
      transition-duration: 0.5s;
      transition-property: transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    &-enter-from, &-leave-to {
      opacity: 0;
    }

    &-enter-active,
    &-leave-active {
      transition-property: opacity;
    }
  }
</style>