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
	import { FoxuiFade } from '@foxui/components'
	import { useProps, useTransition } from '@foxui/composables'
	import type { ITransitionComponentProps } from '@foxui/interfaces'
	import type { TTransitionProps } from '@foxui/types'

	import { omit } from '@foxui/utils'

	import { computed, mergeProps, Transition, useAttrs } from 'vue'

	const props = withDefaults(defineProps<ITransitionComponentProps>(), {
		transition: () => ({component: FoxuiFade}) as unknown as TTransitionProps
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
