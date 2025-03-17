<template>
	<component
			:is="tag"
			:class="containerClasses"
			:style="containerStyles">
		<slot name="default"/>
	</component>
</template>

<script lang="ts" setup>
	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded, useRtl } from '@foxy/composables'

	import { IContainerProps } from '@foxy/interfaces'

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
			'foxy-container',
			{
				'foxy-container--fluid': props.fluid,
				'foxy-container--fullscreen': props.fullscreen
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

<style lang="scss" scoped>
	.foxy-container {
		box-sizing: var(--foxy-container---box-sizing);
		align-items: var(--foxy-container---align-items);
		display: var(--foxy-container---display);

		width: var(--foxy-container---width);
		max-width: var(--foxy-container---max-width);
		min-width: var(--foxy-container---min-width);
		height: var(--foxy-container---height);
		max-height: var(--foxy-container---max-height);
		min-height: var(--foxy-container---min-height);

		padding-block-start: var(--foxy-container---padding-block-start);
		padding-block-end: var(--foxy-container---padding-block-end);
		padding-inline-start: var(--foxy-container---padding-inline-start);
		padding-inline-end: var(--foxy-container---padding-inline-end);

		margin-block-start: var(--foxy-container---margin-block-start);
		margin-block-end: var(--foxy-container---margin-block-end);
		margin-inline-start: var(--foxy-container---margin-inline-start);
		margin-inline-end: var(--foxy-container---margin-inline-end);

		&--bordered {
			border-width: var(--foxy-container--bordered---border-width);
			box-shadow: var(--foxy-container--bordered---box-shadow);
		}

		&--rounded {
			border-radius: var(--foxy-container--rounded---border-radius);
		}

		@media (min-width: 960px) {
			--foxy-container---max-width: 900px;
		}

		@media (min-width: 1280px) {
			--foxy-container---max-width: 1200px;
		}

		@media (min-width: 1920px) {
			--foxy-container---max-width: 1800px;
		}

		@media (min-width: 2560px) {
			--foxy-container---max-width: 2400px;
		}

		&--fluid {
			--foxy-container---max-width: 100%;
		}

		&--fullscreen {
			--foxy-container---max-width: 100%;
			--foxy-container---height: 100%;
			--foxy-container---align-items: center;
			--foxy-container---display: flex;
		}
	}
</style>

<style>
	:root {
		--foxy-container---box-sizing: border-box;

		--foxy-container---width: auto;
		--foxy-container---max-width: 100%;
		--foxy-container---min-width: 0;
		--foxy-container---height: auto;
		--foxy-container---max-height: 100%;
		--foxy-container---min-height: 0;

		--foxy-container---padding-block-start: 16px;
		--foxy-container---padding-block-end: 16px;
		--foxy-container---padding-inline-start: 16px;
		--foxy-container---padding-inline-end: 16px;

		--foxy-container---margin-block-start: 0;
		--foxy-container---margin-block-end: 0;
		--foxy-container---margin-inline-end: auto;
		--foxy-container---margin-inline-start: auto;

		--foxy-container---align-items: auto;
		--foxy-container---display: block;
	}
</style>
