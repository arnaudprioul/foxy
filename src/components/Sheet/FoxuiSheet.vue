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
	} from '@foxui/composables'

	import type { ISheetProps } from "@foxui/interfaces"

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
			'foxui-sheet',
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
	.foxui-sheet {
		position: var(--foxui-sheet---position);
		display: var(--foxui-sheet---display);
		box-sizing: var(--foxui-sheet---box-sizing);

		border-color: var(--foxui-sheet---border-color);
		border-style: var(--foxui-sheet---border-style);
		border-width: var(--foxui-sheet---border-width);
		border-radius: var(--foxui-sheet---border-radius);

		width: var(--foxui-sheet---width);
		max-width: var(--foxui-sheet---max-width);
		min-width: var(--foxui-sheet---min-width);
		height: var(--foxui-sheet---height);
		max-height: var(--foxui-sheet---max-height);
		min-height: var(--foxui-sheet---min-height);

		padding-block-start: var(--foxui-sheet---padding-block-start);
		padding-block-end: var(--foxui-sheet---padding-block-end);
		padding-inline-start: var(--foxui-sheet---padding-inline-start);
		padding-inline-end: var(--foxui-sheet---padding-inline-end);

		margin-block-start: var(--foxui-sheet---margin-block-start);
		margin-block-end: var(--foxui-sheet---margin-block-end);
		margin-inline-start: var(--foxui-sheet---margin-inline-start);
		margin-inline-end: var(--foxui-sheet---margin-inline-end);

		background: var(--foxui-sheet---background);
		box-shadow: var(--foxui-sheet---box-shadow);
		color: var(--foxui-sheet---color);

		&--border {
			border-width: var(--foxui-sheet--border---border-width);
			box-shadow: var(--foxui-sheet--border---box-shadow);
		}

		&--rounded {
			border-radius: var(--foxui-sheet--rounded---border-radius);
		}

		&--absolute {
			--foxui-sheet---position: absolute;
		}

		&--fixed {
			--foxui-sheet---position: fixed;
		}

		&--relative {
			--foxui-sheet---position: relative;
		}

		&--sticky {
			--foxui-sheet---position: sticky;
		}
	}
</style>

<style>
	:root {
		--foxui-sheet---position: relative;
		--foxui-sheet---display: block;
		--foxui-sheet---box-sizing: border-box;

		--foxui-sheet---border-top-width: 0;
		--foxui-sheet---border-left-width: 0;
		--foxui-sheet---border-bottom-width: 0;
		--foxui-sheet---border-right-width: 0;
		--foxui-sheet---border-width: var(--foxui-sheet---border-top-width) var(--foxui-sheet---border-left-width) var(--foxui-sheet---border-bottom-width) var(--foxui-sheet---border-right-width);
		--foxui-sheet---border-color: rgba(0, 0, 0, 0.87);
		--foxui-sheet---border-style: solid;

		--foxui-sheet---border-start-start-radius: 0;
		--foxui-sheet---border-start-end-radius: 0;
		--foxui-sheet---border-end-start-radius: 0;
		--foxui-sheet---border-end-end-radius: 0;
		--foxui-sheet---border-radius: var(--foxui-sheet---border-start-start-radius) var(--foxui-sheet---border-start-end-radius) var(--foxui-sheet---border-end-start-radius) var(--foxui-sheet---border-end-end-radius);

		--foxui-sheet---color: rgba(0, 0, 0, 0.87);
		--foxui-sheet---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxui-sheet---background: rgb(255, 255, 255);

		--foxui-sheet---width: 100%;
		--foxui-sheet---max-width: 100%;
		--foxui-sheet---min-width: 0;
		--foxui-sheet---height: 100%;
		--foxui-sheet---max-height: 100%;
		--foxui-sheet---min-height: 0;

		--foxui-sheet---padding-block-start: 0;
		--foxui-sheet---padding-block-end: 0;
		--foxui-sheet---padding-inline-start: 0;
		--foxui-sheet---padding-inline-end: 0;

		--foxui-sheet---margin-block-start: 0;
		--foxui-sheet---margin-block-end: 0;
		--foxui-sheet---margin-inline-end: 0;
		--foxui-sheet---margin-inline-start: 0;

		--foxui-sheet--border---border-top-width: thin;
		--foxui-sheet--border---border-left-width: thin;
		--foxui-sheet--border---border-bottom-width: thin;
		--foxui-sheet--border---border-right-width: thin;
		--foxui-sheet--border---border-width: var(--foxui-sheet---border-top-width) var(--foxui-sheet---border-left-width) var(--foxui-sheet---border-bottom-width) var(--foxui-sheet---border-right-width);
		--foxui-sheet--border---box-shadow: none;

		--foxui-sheet--rounded---border-radius: 4px;
	}
</style>
