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
	import { useProps, useWindowTransition } from '@foxui/composables'

	import type { ITransitionProps } from '@foxui/interfaces'

	const props = withDefaults(defineProps<ITransitionProps>(), {
		name: 'foxui-transition--window-x-reverse-translate'
	})

	const {filterProps} = useProps<ITransitionProps>(props)

	const {name, tag, transitionProps} = useWindowTransition(props)

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss">
	.foxui-transition--window-x-reverse-translate {
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
			transform: translateX(-100%);
		}

		&-leave-to {
			transform: translateX(100%);
		}

	}
</style>
