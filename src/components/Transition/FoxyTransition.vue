<template>
  <component
      :is="component"
      v-bind="transitionProps">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyFade } from '@foxy/components'
  import { useProps, useTransition } from '@foxy/composables'
  import { ITransitionComponentProps } from '@foxy/interfaces'

  import { omit } from '@foxy/utils'

  import { computed, mergeProps, Transition, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ITransitionComponentProps>(), {
    transition: { component: FoxyFade }
  })

  const {filterProps} = useProps<ITransitionComponentProps>(props)

  const attrs = useAttrs()
  const { isDisabled } = useTransition(props)

  const component = computed(() => {
    return typeof props.transition === 'object' && props.transition.component ? props.transition.component : Transition
  })
  const customProps = computed(() => {
    return typeof props.transition === 'object' ? omit(props.transition, ['component']) : {}
  })
  const transitionProps = computed(() => {
    return mergeProps(
        typeof props.transition === 'string' ? { name: isDisabled.value ? '' : props.transition } : { ...customProps.value },
        { ...attrs },
        { disabled: isDisabled.value })
  })

  // EXPOSE

  defineExpose({
	  filterProps
  })

</script>
