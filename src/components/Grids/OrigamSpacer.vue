<template>
	<component
			:is="tag"
			:class="spacerClasses"
			:style="spacerStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useProps } from "../../composables"

	import type { ISpacerProps } from "../../interfaces"

	const props = withDefaults(defineProps<ISpacerProps>(), {tag: 'div'})

	const {filterProps} = useProps<ISpacerProps>(props)

	// CLASSES & STYLES

	const spacerStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const spacerClasses = computed(() => {
		return [
			'origam-spacer',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-spacer {
		flex-grow: var(--origam-spacer---flex-grow);
	}
</style>

<style>
	:root {
		--origam-spacer---flex-grow: 1;
	}
</style>
