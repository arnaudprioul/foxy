<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "@foxui/composables"
	import type { IIconComponentProps } from '@foxui/interfaces'

	import { convertToUnit } from '@foxui/utils'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'i'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	// CLASS & STYLES

	const iconStyles = computed(() => {
		return [
			{
				'font-size': props.size && typeof props.size === 'number' ? convertToUnit(props.size) : undefined,
				'line-height': props.size && typeof props.size === 'number' ? convertToUnit(props.size) : undefined
			},
			props.style
		] as StyleValue
	})
	const iconClasses = computed(() => {
		return [
			props.icon,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
