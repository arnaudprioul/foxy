<template>
	<component
			:is="tag"
			:class="pickerTitleClasses"
			:style="pickerTitleStyles"
	>
		<slot name="default">
			{{ title }}
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "@origam/composables"

	import type { IPickerTitleProps } from "@origam/interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<IPickerTitleProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<IPickerTitleProps>(props)

	// CLASS & STYLES

	const pickerTitleStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const pickerTitleClasses = computed(() => {
		return [
			'origam-picker-title',
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
	.origam-picker-title {
		text-transform: uppercase;
		font-size: .75rem;
		padding-inline: 24px 12px;
		padding-block: 16px;
		font-weight: 400;
		letter-spacing: .1666666667em
	}
</style>
