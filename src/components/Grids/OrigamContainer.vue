<template>
	<component
			:is="tag"
			:class="containerClasses"
			:style="containerStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded, useRtl } from '../../composables'

	import type { IContainerProps } from '../../interfaces'

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IContainerProps>(), {tag: 'div', fluid: false})

	const {filterProps} = useProps<IContainerProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {rtlClasses} = useRtl()

	// CLASSES & STYLES

	const containerStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const containerClasses = computed(() => {
		return [
			'origam-container',
			{
				'origam-container--fluid': props.fluid,
				'origam-container--fullscreen': props.fullscreen
			},
			rtlClasses.value,
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
	.origam-container {
		box-sizing: var(--origam-container---box-sizing);
		align-items: var(--origam-container---align-items);
		display: var(--origam-container---display);

		width: var(--origam-container---width);
		max-width: var(--origam-container---max-width);
		min-width: var(--origam-container---min-width);
		height: var(--origam-container---height);
		max-height: var(--origam-container---max-height);
		min-height: var(--origam-container---min-height);

		padding-block-start: var(--origam-container---padding-block-start);
		padding-block-end: var(--origam-container---padding-block-end);
		padding-inline-start: var(--origam-container---padding-inline-start);
		padding-inline-end: var(--origam-container---padding-inline-end);

		margin-block-start: var(--origam-container---margin-block-start);
		margin-block-end: var(--origam-container---margin-block-end);
		margin-inline-start: var(--origam-container---margin-inline-start);
		margin-inline-end: var(--origam-container---margin-inline-end);

		&--border {
			border-width: var(--origam-container--border---border-width);
			box-shadow: var(--origam-container--border---box-shadow);
		}

		&--rounded {
			border-radius: var(--origam-container--rounded---border-radius);
		}

		@media (min-width: 960px) {
			--origam-container---max-width: 900px;
		}

		@media (min-width: 1280px) {
			--origam-container---max-width: 1200px;
		}

		@media (min-width: 1920px) {
			--origam-container---max-width: 1800px;
		}

		@media (min-width: 2560px) {
			--origam-container---max-width: 2400px;
		}

		&--fluid {
			--origam-container---max-width: 100%;
		}

		&--fullscreen {
			--origam-container---max-width: 100%;
			--origam-container---height: 100%;
			--origam-container---align-items: center;
			--origam-container---display: flex;
		}
	}
</style>

<style>
	:root {
		--origam-container---box-sizing: border-box;

		--origam-container---width: auto;
		--origam-container---max-width: 100%;
		--origam-container---min-width: 0;
		--origam-container---height: auto;
		--origam-container---max-height: 100%;
		--origam-container---min-height: 0;

		--origam-container---padding-block-start: 16px;
		--origam-container---padding-block-end: 16px;
		--origam-container---padding-inline-start: 16px;
		--origam-container---padding-inline-end: 16px;

		--origam-container---margin-block-start: 0;
		--origam-container---margin-block-end: 0;
		--origam-container---margin-inline-end: auto;
		--origam-container---margin-inline-start: auto;

		--origam-container---align-items: auto;
		--origam-container---display: block;
	}
</style>
