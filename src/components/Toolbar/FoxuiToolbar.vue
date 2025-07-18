<template>
	<component
			:is="tag"
			:id="id"
			:class="barClasses"
	>
		<slot name="default">
			<div class="foxui-toolbar__wrapper">
				<div
						v-if="hasPrepend"
						class="foxui-toolbar__prepend"
				>
					<slot name="prepend"/>
				</div>
				<div
						v-if="hasTitle"
						class="foxui-toolbar__title"
				>
					<slot name="title">
						<foxui-title :text="title"/>
					</slot>
				</div>
				<div class="foxui-toolbar__content">
					<slot name="content"/>
				</div>
				<div
						v-if="hasAppend"
						class="foxui-toolbar__append"
				>
					<slot name="append"/>
				</div>
			</div>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiTitle } from "@foxui/components"
	import {
		useBorder,
		useBothColor,
		useDensity,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useRtl,
		useStyle
	} from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { IToolbarProps } from '@foxui/interfaces'

	import { computed, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<IToolbarProps>(), {
		tag: 'header',
		density: DENSITY.DEFAULT,
		modelValue: true
	})

	const {filterProps} = useProps<IToolbarProps>(props)

	const {rtlClasses} = useRtl()

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {elevationClasses, elevationStyles} = useElevation(props, toRef(props, 'flat'), toRef(props, 'bgColor'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {positionStyles, positionClasses} = usePosition(props)

	const slots = useSlots()

	const hasPrepend = computed(() => {
		return slots.prepend
	})
	const hasTitle = computed(() => {
		return !!(props.title || slots.title)
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	// CLASS & STYLES

	const barStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			positionStyles.value,
			dimensionStyles.value,
			elevationStyles.value,
			props.style
		]
	})
	const barClasses = computed(() => {
		return [
			'foxui-toolbar',
			{
				'foxui-toolbar--collapse': props.collapse,
				'foxui-toolbar--flat': props.flat,
				'foxui-toolbar--floating': props.floating
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			rtlClasses.value,
			positionClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(barStyles)

	// EXPOSE

	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-toolbar {
		$this: &;

		max-width: var(--foxui-toolbar---max-width);
		width: var(--foxui-toolbar---width);
		height: var(--foxui-toolbar---height);
		box-sizing: var(--foxui-toolbar---box-sizing);

		overflow: var(--foxui-toolbar---overflow);

		position: var(--foxui-toolbar---position);
		z-index: var(--foxui-toolbar---zIndex);

		transform: var(--foxui-toolbar---transform);
		transition-duration: var(--foxui-toolbar---transition-duration);
		transition-property: var(--foxui-toolbar---transition-property);
		transition-timing-function: var(--foxui-toolbar---transition-timing-function);

		border-color: var(--foxui-toolbar---border-color);
		border-style: var(--foxui-toolbar---border-style);
		border-width: var(--foxui-toolbar---border-width);
		border-radius: var(--foxui-toolbar---border-radius);

		background: var(--foxui-toolbar---background);
		box-shadow: var(--foxui-toolbar---box-shadow);
		color: var(--foxui-toolbar---color);

		&--border {
			--foxui-toolbar---border-width: thin;
			--foxui-toolbar---box-shadow: none;
		}

		&--rounded {
			--foxui-toolbar---border-radius: 4px;
		}

		&--absolute {
			--foxui-toolbar---position: absolute;
		}

		&--fixed {
			--foxui-toolbar---position: fixed;
		}

		&--sticky {
			--foxui-toolbar---position: sticky;
		}

		&--collapse {
			--foxui-toolbar---max-width: 112px;
			--foxui-toolbar---overflow: hidden;
			--foxui-toolbar---border-end-end-radius: 24px;

			#{$this}__title {
				--foxui-toolbar__title---display: none;
			}
		}

		&--flat {
			--foxui-toolbar---box-shadow: none;
		}

		&--floating {
			--foxui-toolbar---display: inline-flex;
		}

		&__wrapper {
			align-items: var(--foxui-toolbar__wrapper---align-items);
			display: var(--foxui-toolbar__wrapper---display);
			flex: var(--foxui-toolbar__wrapper---flex);
			flex-direction: var(--foxui-toolbar__wrapper---flex-direction);
			justify-content: var(--foxui-toolbar__wrapper---justify-content);
			height: var(--foxui-toolbar__wrapper---height);
			flex-wrap: var(--foxui-toolbar__wrapper---flex-wrap);
		}

		&__content,
		&__extension {
			align-items: var(--foxui-toolbar__content---align-items);
			display: var(--foxui-toolbar__content---display);
			position: var(--foxui-toolbar__content---position);
			transition: var(--foxui-toolbar__content---transition);
			flex-grow: var(--foxui-toolbar__content---flex-grow);
			flex-basis: var(--foxui-toolbar__content---flex-basis);
			max-width: var(--foxui-toolbar__content---max-width);
		}

		&__content {
			height: var(--foxui-toolbar__content---height);

			> .foxui-btn:first-child {
				margin-inline-start: 10px;
			}

			> .foxui-btn:last-child {
				margin-inline-end: 10px;
			}

			> #{$this}__title {
				--foxui-toolbar__title---margin-inline-start: 16px;
			}
		}

		&__prepend {
			align-items: var(--foxui-toolbar__prepend---align-items);
			align-self: var(--foxui-toolbar__prepend---align-self);
			display: var(--foxui-toolbar__prepend---display);
			margin-inline: var(--foxui-toolbar__prepend---margin-inline);
			height: var(--foxui-toolbar__prepend---height);
			flex-grow: var(--foxui-toolbar__prepend---flex-grow);
			flex-shrink: var(--foxui-toolbar__prepend---flex-shrink);
			flex-basis: var(--foxui-toolbar__prepend---flex-basis);
		}

		&__append {
			align-items: var(--foxui-toolbar__append---align-items);
			align-self: var(--foxui-toolbar__append---align-self);
			display: var(--foxui-toolbar__append---display);
			margin-inline: var(--foxui-toolbar__append---margin-inline);
			height: var(--foxui-toolbar__append---height);
			flex-grow: var(--foxui-toolbar__append---flex-grow);
			flex-shrink: var(--foxui-toolbar__append---flex-shrink);
			flex-basis: var(--foxui-toolbar__append---flex-basis);
		}

		&__title {
			align-items: var(--foxui-toolbar__title---align-items);
			height: var(--foxui-toolbar__title---height);
			flex-grow: var(--foxui-toolbar__title---flex-grow);
			flex-shrink: var(--foxui-toolbar__title---flex-shrink);
			flex-basis: var(--foxui-toolbar__title---flex-basis);
			align-self: var(--foxui-toolbar__title---align-self);
			padding-block: var(--foxui-toolbar__title---padding-block);
			padding-inline: var(--foxui-toolbar__title---padding-inline);
			min-width: var(--foxui-toolbar__title---min-width);
			margin-inline: var(--foxui-toolbar__title---margin-inline);
			display: var(--foxui-toolbar__title---display);

			.foxui-title {
				font-size: var(--foxui-toolbar__title---font-size);
				font-weight: var(--foxui-toolbar__title---font-weight);
				letter-spacing: var(--foxui-toolbar__title---letter-spacing);
				line-height: var(--foxui-toolbar__title---line-height);
				text-transform: var(--foxui-toolbar__title---text-transform);
				margin-block: 0;
			}
		}

		&__items {
			display: flex;
			height: inherit;
			align-self: stretch;

			> .foxui-btn {
				border-radius: 0;
			}
		}
	}
</style>

<style>
	:root {
		--foxui-toolbar---border-top-width: 0;
		--foxui-toolbar---border-left-width: 0;
		--foxui-toolbar---border-bottom-width: 0;
		--foxui-toolbar---border-right-width: 0;
		--foxui-toolbar---border-width: var(--foxui-toolbar---border-top-width) var(--foxui-toolbar---border-left-width) var(--foxui-toolbar---border-bottom-width) var(--foxui-toolbar---border-right-width);
		--foxui-toolbar---border-color: rgba(0, 0, 0, 0.87);
		--foxui-toolbar---border-style: solid;
		--foxui-toolbar---border-start-start-radius: 0;
		--foxui-toolbar---border-start-end-radius: 0;
		--foxui-toolbar---border-end-start-radius: 0;
		--foxui-toolbar---border-end-end-radius: 0;
		--foxui-toolbar---border-radius: var(--foxui-toolbar---border-start-start-radius) var(--foxui-toolbar---border-start-end-radius) var(--foxui-toolbar---border-end-start-radius) var(--foxui-toolbar---border-end-end-radius);

		--foxui-toolbar---max-width: 100%;
		--foxui-toolbar---width: 100%;
		--foxui-toolbar---height: 64px;

		--foxui-toolbar---box-sizing: border-box;

		--foxui-toolbar---position: relative;

		--foxui-toolbar---overflow: hidden;

		--foxui-toolbar---zIndex: 1000;

		--foxui-toolbar---transition-duration: 0.2s;
		--foxui-toolbar---transition-property: height, width, transform, max-width, left, right, top, bottom, box-shadow;
		--foxui-toolbar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--foxui-toolbar---color: rgba(0, 0, 0, 0.87);
		--foxui-toolbar---box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
		--foxui-toolbar---background: rgb(255, 255, 255);

		--foxui-toolbar__wrapper---display: flex;
		--foxui-toolbar__wrapper---align-items: flex-start;
		--foxui-toolbar__wrapper---flex-direction: row;
		--foxui-toolbar__wrapper---justify-content: space-between;
		--foxui-toolbar__wrapper---height: 100%;
		--foxui-toolbar__wrapper---flex-wrap: wrap;
		--foxui-toolbar__wrapper---flex: 1 1 auto;

		--foxui-toolbar__title---align-items: center;
		--foxui-toolbar__title---align-self: stretch;
		--foxui-toolbar__title---display: flex;
		--foxui-toolbar__title---height: 100%;
		--foxui-toolbar__title---flex-grow: 0;
		--foxui-toolbar__title---flex-shrink: 0;
		--foxui-toolbar__title---flex-basis: auto;
		--foxui-toolbar__title---width: auto;
		--foxui-toolbar__title---max-width: 100%;
		--foxui-toolbar__title---min-width: 0;
		--foxui-toolbar__title---font-size: 1.25rem;
		--foxui-toolbar__title---font-weight: 400;
		--foxui-toolbar__title---letter-spacing: 0;
		--foxui-toolbar__title---line-height: 1.75rem;
		--foxui-toolbar__title---text-transform: none;
		--foxui-toolbar__title---margin-inline-start: auto;
		--foxui-toolbar__title---margin-inline-end: 10px;
		--foxui-toolbar__title---margin-inline: var(--foxui-toolbar__title---margin-inline-start) var(--foxui-toolbar__title---margin-inline-end);
		--foxui-toolbar__title---margin-block-start: 0;
		--foxui-toolbar__title---margin-block-end: 0;
		--foxui-toolbar__title---margin-block: var(--foxui-toolbar__title---margin-inline-start) var(--foxui-toolbar__title---margin-inline-end);
		--foxui-toolbar__title---padding-block-start: 0;
		--foxui-toolbar__title---padding-block-end: 0;
		--foxui-toolbar__title---padding-block: var(--foxui-toolbar__title---padding-block-start) var(--foxui-toolbar__title---padding-block-end);
		--foxui-toolbar__title---padding-inline-start: 0;
		--foxui-toolbar__title---padding-inline-end: 0;
		--foxui-toolbar__title---padding-inline: var(--foxui-toolbar__title---padding-inline-start) var(--foxui-toolbar__title---padding-inline-end);

		--foxui-toolbar__content---display: flex;
		--foxui-toolbar__content---align-items: center;
		--foxui-toolbar__content---position: relative;
		--foxui-toolbar__content---transition: inherit;
		--foxui-toolbar__content---height: 100%;
		--foxui-toolbar__content---flex-grow: 1;
		--foxui-toolbar__content---flex-basis: 0;
		--foxui-toolbar__content---max-width: 100%;

		--foxui-toolbar__append---margin-inline-start: auto;
		--foxui-toolbar__append---margin-inline-end: 10px;
		--foxui-toolbar__append---margin-inline: var(--foxui-toolbar__append---margin-inline-start) var(--foxui-toolbar__append---margin-inline-end);
		--foxui-toolbar__append---align-items: center;
		--foxui-toolbar__append---align-self: stretch;
		--foxui-toolbar__append---display: flex;
		--foxui-toolbar__append---height: 100%;
		--foxui-toolbar__append---flex-grow: 0;
		--foxui-toolbar__append---flex-shrink: 0;
		--foxui-toolbar__append---flex-basis: auto;
		--foxui-toolbar__append---width: auto;
		--foxui-toolbar__append---max-width: 100%;

		--foxui-toolbar__prepend---margin-inline-start: 10px;
		--foxui-toolbar__prepend---margin-inline-end: auto;
		--foxui-toolbar__prepend---margin-inline: var(--foxui-toolbar__prepend---margin-inline-start) var(--foxui-toolbar__prepend---margin-inline-end);
		--foxui-toolbar__prepend---align-items: center;
		--foxui-toolbar__prepend---align-self: stretch;
		--foxui-toolbar__prepend---display: flex;
		--foxui-toolbar__prepend---height: 100%;
		--foxui-toolbar__prepend---flex-grow: 0;
		--foxui-toolbar__prepend---flex-shrink: 0;
		--foxui-toolbar__prepend---flex-basis: auto;
		--foxui-toolbar__prepend---width: auto;
		--foxui-toolbar__prepend---max-width: 100%;
	}
</style>
