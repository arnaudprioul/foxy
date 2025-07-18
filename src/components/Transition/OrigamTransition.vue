<template>
	<component
			:is="component"
			v-bind="transitionProps"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamFade } from '@origam/components'
	import { useProps, useTransition } from '@origam/composables'
	import type { ITransitionComponentProps } from '@origam/interfaces'
	import type { TTransitionProps } from '@origam/types'

	import { omit } from '@origam/utils'

	import { computed, mergeProps, Transition, useAttrs } from 'vue'

	const props = withDefaults(defineProps<ITransitionComponentProps>(), {
		transition: () => ({component: OrigamFade}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<ITransitionComponentProps>(props)

	const attrs = useAttrs()
	const {isDisabled} = useTransition(props)

	const component = computed(() => {
		return typeof props.transition === 'object' && props.transition.component ? props.transition.component : Transition
	})
	const customProps = computed(() => {
		return typeof props.transition === 'object' ? omit(props.transition, ['component']) : {}
	})
	const transitionProps = computed(() => {
		return mergeProps(
				typeof props.transition === 'string' ? {name: isDisabled.value ? '' : props.transition} : {...customProps.value},
				{...attrs},
				{disabled: isDisabled.value})
	})

	// EXPOSE

	defineExpose({
		filterProps
	})

</script>
