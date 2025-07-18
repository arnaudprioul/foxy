<template>
	<component
			:is="tag"
			:class="tableClasses"
			:style="tableStyles"
	>
		<slot name="top"/>

		<div
				:class="tableWrapperClasses"
				:style="tableWrapperStyles"
		>
			<slot name="wrapper">
				<table>
					<slot name="default"/>
				</table>
			</slot>
		</div>

		<slot name="bottom"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		useBorder,
		useDensity,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { ITableProps } from '@foxui/interfaces'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<ITableProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<ITableProps>(props)

	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {roundedStyles, roundedClasses} = useRounded(props)
	const {elevationClasses} = useElevation(props)
	const {paddingStyles, paddingClasses} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const tableStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const tableClasses = computed(() => {
		return [
			'foxui-table',
			{
				'foxui-table--fixed-header': props.fixedHeader,
				'foxui-table--fixed-footer': props.fixedFooter,
				'foxui-table--has-top': slots.top,
				'foxui-table--has-bottom': slots.bottom
			},
			densityClasses.value,
			borderClasses.value,
			roundedClasses.value,
			elevationClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const tableWrapperStyles = computed(() => {
		return [
			dimensionStyles.value,
			props.style
		] as StyleValue
	})
	const tableWrapperClasses = computed(() => {
		return [
			'foxui-table__wrapper',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
