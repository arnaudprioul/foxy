<template>
	<component
			:is="tag"
			:class="titleClasses"
			:style="titleStyles"
	>
		<slot
				v-if="hasContent"
				name="default"
		>
			{{ text }}
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps } from '@foxui/composables'

	import type { ITitleProps } from '@foxui/interfaces'
	import { computed, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<ITitleProps>(), {tag: 'h1'})

	const {filterProps} = useProps<ITitleProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const slots = useSlots()
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const hasContent = computed(() => {
		return slots.default || props.text
	})

	// CLASSES & STYLES

	const titleStyles = computed(() => {
		return [
			colorStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const titleClasses = computed(() => {
		return [
			'foxui-title',
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
