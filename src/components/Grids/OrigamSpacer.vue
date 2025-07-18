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
	import { useProps } from "@origam/composables"

	import type { ISpacerProps } from "@origam/interfaces"

	import { computed, StyleValue } from 'vue'

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
