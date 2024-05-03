<template>
  <component
      :is="tag"
      :name="name"
      v-bind="transitionProps">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { useWindowTransition } from '@foxy/composables'

  import { ITransitionProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ITransitionProps>(), {
    name: 'foxy-transition--window-y-translate'
  })

  const { name, tag, transitionProps } = useWindowTransition(props)
</script>

<style lang="scss">
  .foxy-transition--window-y-translate {
    &-enter-active,
    &-leave-active {
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }

    &-leave-from,
    &-leave-to {
      position: absolute !important;
      top: 0;
      width: 100%;
    }

    &-enter-from {
      transform: translateY(100%);
    }

    &-leave-to {
      transform: translateY(-100%);
    }
  }
</style>