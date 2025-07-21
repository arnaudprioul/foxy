<template>
	<component
			:is="tag"
			:name="name"
			v-bind="transitionProps"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps, useWindowTransition } from '@/composables'

	import type { ITransitionProps } from '@/interfaces'

	const props = withDefaults(defineProps<ITransitionProps>(), {
		name: 'origam-transition--window-x-translate'
	})

	const {filterProps} = useProps<ITransitionProps>(props)

	const {name, tag, transitionProps} = useWindowTransition(props)

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss">
	.origam-transition--window-x-translate {
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
			transform: translateX(100%);
		}

		&-leave-to {
			transform: translateX(-100%);
		}

	}
</style>
