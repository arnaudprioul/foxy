<template>
	<component
			:is="tag"
			:class="highlightClasses"
			:style="highlightStyles"
	>
		<slot name="default">
			{{ textAutoEscape }}
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		useBorder,
		useBothColor,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useVModel
	} from "@foxy/composables"
	import { IHighlightProps } from "@foxy/interfaces"
	import { computed, StyleValue, toRef } from "vue"

	const props = withDefaults(defineProps<IHighlightProps>(), {
		tag: 'mark',
		autoEscape: true,
		patterns: () => [],
		text: ''
	})

	const {filterProps} = useProps<IHighlightProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {elevationClasses} = useElevation(props)

	const text = useVModel(props, 'text', '')

	const textAutoEscape = computed(() => {
		return props.autoEscape ? text.value?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : text.value
	})

	// CLASS & STYLES

	const highlightStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const highlightClasses = computed(() => {
		return [
			'foxy-hightlight',
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
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

</style>
