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
	import { useProps } from "@foxui/composables"

	import type { ISpacerProps } from "@foxui/interfaces"

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
			'foxui-spacer',
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
	.foxui-spacer {
		flex-grow: var(--foxui-spacer---flex-grow);
	}
</style>

<style>
	:root {
		--foxui-spacer---flex-grow: 1;
	}
</style>
