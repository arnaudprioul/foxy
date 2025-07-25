<template>
	<hr
			:aria-orientation="dividerOrientation"
			:class="dividerClasses"
			:role="dividerRole"
			:style="dividerStyles"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, useAttrs } from 'vue'
	import { useMargin, useProps } from '../../composables'
	import { DIRECTION } from '../../enums'

	import type { IDividerProps } from '../../interfaces'

	import { convertToUnit } from '../../utils'

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IDividerProps>(), {
		direction: DIRECTION.HORIZONTAL
	})

	const {filterProps} = useProps<IDividerProps>(props)

	const dividerOrientation = computed(() => {
		return !attrs.role || attrs.role === 'separator'
				? props.direction
				: undefined
	})
	const dividerRole = computed(() => {
		return `${attrs.role || 'separator'}`
	})

	const {marginClasses, marginStyles} = useMargin(props)

	// CLASSES & STYLES

	const dividerClasses = computed(() => {
		return [
			'origam-divider',
			`origam-divider--${props.direction}`,
			{
				'origam-divider--inset': props.inset
			},
			marginClasses.value,
			props.class
		]
	})
	const dividerStyles = computed(() => {
		const styles = [
			marginStyles.value,
			props.style
		]

		if (props.length) {
			styles.push({[props.direction === DIRECTION.VERTICAL ? '--origam-divider---max-height' : '--origam-divider---max-width']: convertToUnit(props.length)})
		}

		if (props.thickness) {
			styles.push({[props.direction === DIRECTION.VERTICAL ? '--origam-divider---border-right-width' : '--origam-divider---border-top-width']: convertToUnit(props.thickness)})
		}

		return styles as StyleValue
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
	.origam-divider {
		display: block;
		flex: 1 1 100%;
		height: 0px;
		max-height: 0px;
		opacity: 0.12;
		transition: inherit;
		border-style: solid;
		border-width: thin 0 0 0;
		margin: 0;

		&--vertical {
			align-self: stretch;
			border-width: 0 thin 0 0;
			display: inline-flex;
			height: auto;
			margin-left: -1px;
			max-height: 100%;
			max-width: 0px;
			vertical-align: text-bottom;
			width: 0px;
		}
	}
</style>
