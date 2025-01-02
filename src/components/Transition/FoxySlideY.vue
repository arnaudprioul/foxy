<template>
  <component
      :is="tag"
      :name="name"
      v-bind="transitionProps">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
	import { useCssTransition, useProps } from '@foxy/composables'

  import { ITransitionProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<ITransitionProps>(), {
    name: 'foxy-transition--slide-y'
  })

  const {filterProps} = useProps<ITransitionProps>(props)

  const { name, tag, transitionProps } = useCssTransition(props)

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss">
  .foxy-transition--slide-y {
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
      transform: translateY(-15px);
    }

    &-enter-active,
    &-leave-active {
      transition-property: transform, opacity !important;
    }
  }
</style>
