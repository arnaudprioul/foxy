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
	import { useCssTransition, useProps } from '../../composables'

	import type { ITransitionProps } from '../../interfaces'

	const props = withDefaults(defineProps<ITransitionProps>(), {
		name: 'origam-transition--reverse-translate-picker'
	})

	const {filterProps} = useProps<ITransitionProps>(props)

	const {name, tag, transitionProps} = useCssTransition(props)

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss">
	.origam-transition--reverse-translate-picker {
		&-enter-active {
			transition-duration: 0.3s !important;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
		}

		&-leave-active {
			transition-duration: 0.3s !important;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
		}

		&-move {
			transition-duration: 0.3s !important;
			transition-property: transform !important;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
		}

		&-enter-from,
		&-leave-to {
			opacity: 0;
		}

		&-leave-from,
		&-leave-active,
		&-leave-to {
			position: absolute !important;
		}

		&-enter-active,
		&-leave-active {
			transition-property: transform, opacity !important;
		}

		&-enter-from {
			transform: translate(-100%, 0);
		}

		&-leave-to {
			transform: translate(100%, 0);
		}
	}
</style>
