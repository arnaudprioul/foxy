<template>
	<component
			:is="tag"
			:class="sheetClasses"
			:style="sheetStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		useBorder,
		useBothColor,
		useDimension,
		useElevation,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded
	} from '@foxy/composables'

	import type { ISheetProps } from "@foxy/interfaces"

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<ISheetProps>(), {tag: 'div'})

	const {filterProps} = useProps<ISheetProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {borderClasses, borderStyles} = useBorder(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props)
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const sheetStyles = computed(() => {
		return [
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const sheetClasses = computed(() => {
		return [
			'foxy-sheet',
			elevationClasses.value,
			positionClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			roundedClasses.value,
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
	.foxy-sheet {
		position: var(--foxy-sheet---position);
		display: var(--foxy-sheet---display);
		box-sizing: var(--foxy-sheet---box-sizing);

		border-color: var(--foxy-sheet---border-color);
		border-style: var(--foxy-sheet---border-style);
		border-width: var(--foxy-sheet---border-width);
		border-radius: var(--foxy-sheet---border-radius);

		width: var(--foxy-sheet---width);
		max-width: var(--foxy-sheet---max-width);
		min-width: var(--foxy-sheet---min-width);
		height: var(--foxy-sheet---height);
		max-height: var(--foxy-sheet---max-height);
		min-height: var(--foxy-sheet---min-height);

		padding-block-start: var(--foxy-sheet---padding-block-start);
		padding-block-end: var(--foxy-sheet---padding-block-end);
		padding-inline-start: var(--foxy-sheet---padding-inline-start);
		padding-inline-end: var(--foxy-sheet---padding-inline-end);

		margin-block-start: var(--foxy-sheet---margin-block-start);
		margin-block-end: var(--foxy-sheet---margin-block-end);
		margin-inline-start: var(--foxy-sheet---margin-inline-start);
		margin-inline-end: var(--foxy-sheet---margin-inline-end);

		background: var(--foxy-sheet---background);
		box-shadow: var(--foxy-sheet---box-shadow);
		color: var(--foxy-sheet---color);

		&--border {
			border-width: var(--foxy-sheet--border---border-width);
			box-shadow: var(--foxy-sheet--border---box-shadow);
		}

		&--rounded {
			border-radius: var(--foxy-sheet--rounded---border-radius);
		}

		&--absolute {
			--foxy-sheet---position: absolute;
		}

		&--fixed {
			--foxy-sheet---position: fixed;
		}

		&--relative {
			--foxy-sheet---position: relative;
		}

		&--sticky {
			--foxy-sheet---position: sticky;
		}
	}
</style>

<style>
	:root {
		--foxy-sheet---position: relative;
		--foxy-sheet---display: block;
		--foxy-sheet---box-sizing: border-box;

		--foxy-sheet---border-top-width: 0;
		--foxy-sheet---border-left-width: 0;
		--foxy-sheet---border-bottom-width: 0;
		--foxy-sheet---border-right-width: 0;
		--foxy-sheet---border-width: var(--foxy-sheet---border-top-width) var(--foxy-sheet---border-left-width) var(--foxy-sheet---border-bottom-width) var(--foxy-sheet---border-right-width);
		--foxy-sheet---border-color: rgba(0, 0, 0, 0.87);
		--foxy-sheet---border-style: solid;

		--foxy-sheet---border-start-start-radius: 0;
		--foxy-sheet---border-start-end-radius: 0;
		--foxy-sheet---border-end-start-radius: 0;
		--foxy-sheet---border-end-end-radius: 0;
		--foxy-sheet---border-radius: var(--foxy-sheet---border-start-start-radius) var(--foxy-sheet---border-start-end-radius) var(--foxy-sheet---border-end-start-radius) var(--foxy-sheet---border-end-end-radius);

		--foxy-sheet---color: rgba(0, 0, 0, 0.87);
		--foxy-sheet---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxy-sheet---background: rgb(255, 255, 255);

		--foxy-sheet---width: 100%;
		--foxy-sheet---max-width: 100%;
		--foxy-sheet---min-width: 0;
		--foxy-sheet---height: 100%;
		--foxy-sheet---max-height: 100%;
		--foxy-sheet---min-height: 0;

		--foxy-sheet---padding-block-start: 0;
		--foxy-sheet---padding-block-end: 0;
		--foxy-sheet---padding-inline-start: 0;
		--foxy-sheet---padding-inline-end: 0;

		--foxy-sheet---margin-block-start: 0;
		--foxy-sheet---margin-block-end: 0;
		--foxy-sheet---margin-inline-end: 0;
		--foxy-sheet---margin-inline-start: 0;

		--foxy-sheet--border---border-top-width: thin;
		--foxy-sheet--border---border-left-width: thin;
		--foxy-sheet--border---border-bottom-width: thin;
		--foxy-sheet--border---border-right-width: thin;
		--foxy-sheet--border---border-width: var(--foxy-sheet---border-top-width) var(--foxy-sheet---border-left-width) var(--foxy-sheet---border-bottom-width) var(--foxy-sheet---border-right-width);
		--foxy-sheet--border---box-shadow: none;

		--foxy-sheet--rounded---border-radius: 4px;
	}
</style>
