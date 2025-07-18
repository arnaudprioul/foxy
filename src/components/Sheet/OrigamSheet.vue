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
	} from '@origam/composables'

	import type { ISheetProps } from "@origam/interfaces"

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
			'origam-sheet',
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
	.origam-sheet {
		position: var(--origam-sheet---position);
		display: var(--origam-sheet---display);
		box-sizing: var(--origam-sheet---box-sizing);

		border-color: var(--origam-sheet---border-color);
		border-style: var(--origam-sheet---border-style);
		border-width: var(--origam-sheet---border-width);
		border-radius: var(--origam-sheet---border-radius);

		width: var(--origam-sheet---width);
		max-width: var(--origam-sheet---max-width);
		min-width: var(--origam-sheet---min-width);
		height: var(--origam-sheet---height);
		max-height: var(--origam-sheet---max-height);
		min-height: var(--origam-sheet---min-height);

		padding-block-start: var(--origam-sheet---padding-block-start);
		padding-block-end: var(--origam-sheet---padding-block-end);
		padding-inline-start: var(--origam-sheet---padding-inline-start);
		padding-inline-end: var(--origam-sheet---padding-inline-end);

		margin-block-start: var(--origam-sheet---margin-block-start);
		margin-block-end: var(--origam-sheet---margin-block-end);
		margin-inline-start: var(--origam-sheet---margin-inline-start);
		margin-inline-end: var(--origam-sheet---margin-inline-end);

		background: var(--origam-sheet---background);
		box-shadow: var(--origam-sheet---box-shadow);
		color: var(--origam-sheet---color);

		&--border {
			border-width: var(--origam-sheet--border---border-width);
			box-shadow: var(--origam-sheet--border---box-shadow);
		}

		&--rounded {
			border-radius: var(--origam-sheet--rounded---border-radius);
		}

		&--absolute {
			--origam-sheet---position: absolute;
		}

		&--fixed {
			--origam-sheet---position: fixed;
		}

		&--relative {
			--origam-sheet---position: relative;
		}

		&--sticky {
			--origam-sheet---position: sticky;
		}
	}
</style>

<style>
	:root {
		--origam-sheet---position: relative;
		--origam-sheet---display: block;
		--origam-sheet---box-sizing: border-box;

		--origam-sheet---border-top-width: 0;
		--origam-sheet---border-left-width: 0;
		--origam-sheet---border-bottom-width: 0;
		--origam-sheet---border-right-width: 0;
		--origam-sheet---border-width: var(--origam-sheet---border-top-width) var(--origam-sheet---border-left-width) var(--origam-sheet---border-bottom-width) var(--origam-sheet---border-right-width);
		--origam-sheet---border-color: rgba(0, 0, 0, 0.87);
		--origam-sheet---border-style: solid;

		--origam-sheet---border-start-start-radius: 0;
		--origam-sheet---border-start-end-radius: 0;
		--origam-sheet---border-end-start-radius: 0;
		--origam-sheet---border-end-end-radius: 0;
		--origam-sheet---border-radius: var(--origam-sheet---border-start-start-radius) var(--origam-sheet---border-start-end-radius) var(--origam-sheet---border-end-start-radius) var(--origam-sheet---border-end-end-radius);

		--origam-sheet---color: rgba(0, 0, 0, 0.87);
		--origam-sheet---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--origam-sheet---background: rgb(255, 255, 255);

		--origam-sheet---width: 100%;
		--origam-sheet---max-width: 100%;
		--origam-sheet---min-width: 0;
		--origam-sheet---height: 100%;
		--origam-sheet---max-height: 100%;
		--origam-sheet---min-height: 0;

		--origam-sheet---padding-block-start: 0;
		--origam-sheet---padding-block-end: 0;
		--origam-sheet---padding-inline-start: 0;
		--origam-sheet---padding-inline-end: 0;

		--origam-sheet---margin-block-start: 0;
		--origam-sheet---margin-block-end: 0;
		--origam-sheet---margin-inline-end: 0;
		--origam-sheet---margin-inline-start: 0;

		--origam-sheet--border---border-top-width: thin;
		--origam-sheet--border---border-left-width: thin;
		--origam-sheet--border---border-bottom-width: thin;
		--origam-sheet--border---border-right-width: thin;
		--origam-sheet--border---border-width: var(--origam-sheet---border-top-width) var(--origam-sheet---border-left-width) var(--origam-sheet---border-bottom-width) var(--origam-sheet---border-right-width);
		--origam-sheet--border---box-shadow: none;

		--origam-sheet--rounded---border-radius: 4px;
	}
</style>
