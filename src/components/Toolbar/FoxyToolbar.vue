<template>
	<component
			:is="tag"
			:id="id"
			:class="barClasses"
	>
		<slot name="default">
			<div class="foxy-toolbar__wrapper">
				<div
						v-if="hasPrepend"
						class="foxy-toolbar__prepend"
				>
					<slot name="prepend"/>
				</div>
				<div
						v-if="hasTitle"
						class="foxy-toolbar__title"
				>
					<slot name="title">
						<foxy-title :text="title"/>
					</slot>
				</div>
				<div class="foxy-toolbar__content">
					<slot name="content"/>
				</div>
				<div
						v-if="hasAppend"
						class="foxy-toolbar__append"
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
	import { FoxyTitle } from "@foxy/components"
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
	} from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import type { IToolbarProps } from '@foxy/interfaces'

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
			'foxy-toolbar',
			{
				'foxy-toolbar--collapse': props.collapse,
				'foxy-toolbar--flat': props.flat,
				'foxy-toolbar--floating': props.floating
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
	.foxy-toolbar {
		$this: &;

		max-width: var(--foxy-toolbar---max-width);
		width: var(--foxy-toolbar---width);
		height: var(--foxy-toolbar---height);
		box-sizing: var(--foxy-toolbar---box-sizing);

		overflow: var(--foxy-toolbar---overflow);

		position: var(--foxy-toolbar---position);
		z-index: var(--foxy-toolbar---zIndex);

		transform: var(--foxy-toolbar---transform);
		transition-duration: var(--foxy-toolbar---transition-duration);
		transition-property: var(--foxy-toolbar---transition-property);
		transition-timing-function: var(--foxy-toolbar---transition-timing-function);

		border-color: var(--foxy-toolbar---border-color);
		border-style: var(--foxy-toolbar---border-style);
		border-width: var(--foxy-toolbar---border-width);
		border-radius: var(--foxy-toolbar---border-radius);

		background: var(--foxy-toolbar---background);
		box-shadow: var(--foxy-toolbar---box-shadow);
		color: var(--foxy-toolbar---color);

		&--border {
			--foxy-toolbar---border-width: thin;
			--foxy-toolbar---box-shadow: none;
		}

		&--rounded {
			--foxy-toolbar---border-radius: 4px;
		}

		&--absolute {
			--foxy-toolbar---position: absolute;
		}

		&--fixed {
			--foxy-toolbar---position: fixed;
		}

		&--sticky {
			--foxy-toolbar---position: sticky;
		}

		&--collapse {
			--foxy-toolbar---max-width: 112px;
			--foxy-toolbar---overflow: hidden;
			--foxy-toolbar---border-end-end-radius: 24px;

			#{$this}__title {
				--foxy-toolbar__title---display: none;
			}
		}

		&--flat {
			--foxy-toolbar---box-shadow: none;
		}

		&--floating {
			--foxy-toolbar---display: inline-flex;
		}

		&__wrapper {
			align-items: var(--foxy-toolbar__wrapper---align-items);
			display: var(--foxy-toolbar__wrapper---display);
			flex: var(--foxy-toolbar__wrapper---flex);
			flex-direction: var(--foxy-toolbar__wrapper---flex-direction);
			justify-content: var(--foxy-toolbar__wrapper---justify-content);
			height: var(--foxy-toolbar__wrapper---height);
			flex-wrap: var(--foxy-toolbar__wrapper---flex-wrap);
		}

		&__content,
		&__extension {
			align-items: var(--foxy-toolbar__content---align-items);
			display: var(--foxy-toolbar__content---display);
			position: var(--foxy-toolbar__content---position);
			transition: var(--foxy-toolbar__content---transition);
			flex-grow: var(--foxy-toolbar__content---flex-grow);
			flex-basis: var(--foxy-toolbar__content---flex-basis);
			max-width: var(--foxy-toolbar__content---max-width);
		}

		&__content {
			height: var(--foxy-toolbar__content---height);

			> .foxy-btn:first-child {
				margin-inline-start: 10px;
			}

			> .foxy-btn:last-child {
				margin-inline-end: 10px;
			}

			> #{$this}__title {
				--foxy-toolbar__title---margin-inline-start: 16px;
			}
		}

		&__prepend {
			align-items: var(--foxy-toolbar__prepend---align-items);
			align-self: var(--foxy-toolbar__prepend---align-self);
			display: var(--foxy-toolbar__prepend---display);
			margin-inline: var(--foxy-toolbar__prepend---margin-inline);
			height: var(--foxy-toolbar__prepend---height);
			flex-grow: var(--foxy-toolbar__prepend---flex-grow);
			flex-shrink: var(--foxy-toolbar__prepend---flex-shrink);
			flex-basis: var(--foxy-toolbar__prepend---flex-basis);
		}

		&__append {
			align-items: var(--foxy-toolbar__append---align-items);
			align-self: var(--foxy-toolbar__append---align-self);
			display: var(--foxy-toolbar__append---display);
			margin-inline: var(--foxy-toolbar__append---margin-inline);
			height: var(--foxy-toolbar__append---height);
			flex-grow: var(--foxy-toolbar__append---flex-grow);
			flex-shrink: var(--foxy-toolbar__append---flex-shrink);
			flex-basis: var(--foxy-toolbar__append---flex-basis);
		}

		&__title {
			align-items: var(--foxy-toolbar__title---align-items);
			height: var(--foxy-toolbar__title---height);
			flex-grow: var(--foxy-toolbar__title---flex-grow);
			flex-shrink: var(--foxy-toolbar__title---flex-shrink);
			flex-basis: var(--foxy-toolbar__title---flex-basis);
			align-self: var(--foxy-toolbar__title---align-self);
			padding-block: var(--foxy-toolbar__title---padding-block);
			padding-inline: var(--foxy-toolbar__title---padding-inline);
			min-width: var(--foxy-toolbar__title---min-width);
			margin-inline: var(--foxy-toolbar__title---margin-inline);
			display: var(--foxy-toolbar__title---display);

			.foxy-title {
				font-size: var(--foxy-toolbar__title---font-size);
				font-weight: var(--foxy-toolbar__title---font-weight);
				letter-spacing: var(--foxy-toolbar__title---letter-spacing);
				line-height: var(--foxy-toolbar__title---line-height);
				text-transform: var(--foxy-toolbar__title---text-transform);
				margin-block: 0;
			}
		}

		&__items {
			display: flex;
			height: inherit;
			align-self: stretch;

			> .foxy-btn {
				border-radius: 0;
			}
		}
	}
</style>

<style>
	:root {
		--foxy-toolbar---border-top-width: 0;
		--foxy-toolbar---border-left-width: 0;
		--foxy-toolbar---border-bottom-width: 0;
		--foxy-toolbar---border-right-width: 0;
		--foxy-toolbar---border-width: var(--foxy-toolbar---border-top-width) var(--foxy-toolbar---border-left-width) var(--foxy-toolbar---border-bottom-width) var(--foxy-toolbar---border-right-width);
		--foxy-toolbar---border-color: rgba(0, 0, 0, 0.87);
		--foxy-toolbar---border-style: solid;
		--foxy-toolbar---border-start-start-radius: 0;
		--foxy-toolbar---border-start-end-radius: 0;
		--foxy-toolbar---border-end-start-radius: 0;
		--foxy-toolbar---border-end-end-radius: 0;
		--foxy-toolbar---border-radius: var(--foxy-toolbar---border-start-start-radius) var(--foxy-toolbar---border-start-end-radius) var(--foxy-toolbar---border-end-start-radius) var(--foxy-toolbar---border-end-end-radius);

		--foxy-toolbar---max-width: 100%;
		--foxy-toolbar---width: 100%;
		--foxy-toolbar---height: 64px;

		--foxy-toolbar---box-sizing: border-box;

		--foxy-toolbar---position: relative;

		--foxy-toolbar---overflow: hidden;

		--foxy-toolbar---zIndex: 1000;

		--foxy-toolbar---transition-duration: 0.2s;
		--foxy-toolbar---transition-property: height, width, transform, max-width, left, right, top, bottom, box-shadow;
		--foxy-toolbar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--foxy-toolbar---color: rgba(0, 0, 0, 0.87);
		--foxy-toolbar---box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
		--foxy-toolbar---background: rgb(255, 255, 255);

		--foxy-toolbar__wrapper---display: flex;
		--foxy-toolbar__wrapper---align-items: flex-start;
		--foxy-toolbar__wrapper---flex-direction: row;
		--foxy-toolbar__wrapper---justify-content: space-between;
		--foxy-toolbar__wrapper---height: 100%;
		--foxy-toolbar__wrapper---flex-wrap: wrap;
		--foxy-toolbar__wrapper---flex: 1 1 auto;

		--foxy-toolbar__title---align-items: center;
		--foxy-toolbar__title---align-self: stretch;
		--foxy-toolbar__title---display: flex;
		--foxy-toolbar__title---height: 100%;
		--foxy-toolbar__title---flex-grow: 0;
		--foxy-toolbar__title---flex-shrink: 0;
		--foxy-toolbar__title---flex-basis: auto;
		--foxy-toolbar__title---width: auto;
		--foxy-toolbar__title---max-width: 100%;
		--foxy-toolbar__title---min-width: 0;
		--foxy-toolbar__title---font-size: 1.25rem;
		--foxy-toolbar__title---font-weight: 400;
		--foxy-toolbar__title---letter-spacing: 0;
		--foxy-toolbar__title---line-height: 1.75rem;
		--foxy-toolbar__title---text-transform: none;
		--foxy-toolbar__title---margin-inline-start: auto;
		--foxy-toolbar__title---margin-inline-end: 10px;
		--foxy-toolbar__title---margin-inline: var(--foxy-toolbar__title---margin-inline-start) var(--foxy-toolbar__title---margin-inline-end);
		--foxy-toolbar__title---margin-block-start: 0;
		--foxy-toolbar__title---margin-block-end: 0;
		--foxy-toolbar__title---margin-block: var(--foxy-toolbar__title---margin-inline-start) var(--foxy-toolbar__title---margin-inline-end);
		--foxy-toolbar__title---padding-block-start: 0;
		--foxy-toolbar__title---padding-block-end: 0;
		--foxy-toolbar__title---padding-block: var(--foxy-toolbar__title---padding-block-start) var(--foxy-toolbar__title---padding-block-end);
		--foxy-toolbar__title---padding-inline-start: 0;
		--foxy-toolbar__title---padding-inline-end: 0;
		--foxy-toolbar__title---padding-inline: var(--foxy-toolbar__title---padding-inline-start) var(--foxy-toolbar__title---padding-inline-end);

		--foxy-toolbar__content---display: flex;
		--foxy-toolbar__content---align-items: center;
		--foxy-toolbar__content---position: relative;
		--foxy-toolbar__content---transition: inherit;
		--foxy-toolbar__content---height: 100%;
		--foxy-toolbar__content---flex-grow: 1;
		--foxy-toolbar__content---flex-basis: 0;
		--foxy-toolbar__content---max-width: 100%;

		--foxy-toolbar__append---margin-inline-start: auto;
		--foxy-toolbar__append---margin-inline-end: 10px;
		--foxy-toolbar__append---margin-inline: var(--foxy-toolbar__append---margin-inline-start) var(--foxy-toolbar__append---margin-inline-end);
		--foxy-toolbar__append---align-items: center;
		--foxy-toolbar__append---align-self: stretch;
		--foxy-toolbar__append---display: flex;
		--foxy-toolbar__append---height: 100%;
		--foxy-toolbar__append---flex-grow: 0;
		--foxy-toolbar__append---flex-shrink: 0;
		--foxy-toolbar__append---flex-basis: auto;
		--foxy-toolbar__append---width: auto;
		--foxy-toolbar__append---max-width: 100%;

		--foxy-toolbar__prepend---margin-inline-start: 10px;
		--foxy-toolbar__prepend---margin-inline-end: auto;
		--foxy-toolbar__prepend---margin-inline: var(--foxy-toolbar__prepend---margin-inline-start) var(--foxy-toolbar__prepend---margin-inline-end);
		--foxy-toolbar__prepend---align-items: center;
		--foxy-toolbar__prepend---align-self: stretch;
		--foxy-toolbar__prepend---display: flex;
		--foxy-toolbar__prepend---height: 100%;
		--foxy-toolbar__prepend---flex-grow: 0;
		--foxy-toolbar__prepend---flex-shrink: 0;
		--foxy-toolbar__prepend---flex-basis: auto;
		--foxy-toolbar__prepend---width: auto;
		--foxy-toolbar__prepend---max-width: 100%;
	}
</style>
