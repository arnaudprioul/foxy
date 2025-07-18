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
	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded, useRtl } from '@foxui/composables'

	import type { IContainerProps } from '@foxui/interfaces'

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
			'foxui-container',
			{
				'foxui-container--fluid': props.fluid,
				'foxui-container--fullscreen': props.fullscreen
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
	.foxui-container {
		box-sizing: var(--foxui-container---box-sizing);
		align-items: var(--foxui-container---align-items);
		display: var(--foxui-container---display);

		width: var(--foxui-container---width);
		max-width: var(--foxui-container---max-width);
		min-width: var(--foxui-container---min-width);
		height: var(--foxui-container---height);
		max-height: var(--foxui-container---max-height);
		min-height: var(--foxui-container---min-height);

		padding-block-start: var(--foxui-container---padding-block-start);
		padding-block-end: var(--foxui-container---padding-block-end);
		padding-inline-start: var(--foxui-container---padding-inline-start);
		padding-inline-end: var(--foxui-container---padding-inline-end);

		margin-block-start: var(--foxui-container---margin-block-start);
		margin-block-end: var(--foxui-container---margin-block-end);
		margin-inline-start: var(--foxui-container---margin-inline-start);
		margin-inline-end: var(--foxui-container---margin-inline-end);

		&--border {
			border-width: var(--foxui-container--border---border-width);
			box-shadow: var(--foxui-container--border---box-shadow);
		}

		&--rounded {
			border-radius: var(--foxui-container--rounded---border-radius);
		}

		@media (min-width: 960px) {
			--foxui-container---max-width: 900px;
		}

		@media (min-width: 1280px) {
			--foxui-container---max-width: 1200px;
		}

		@media (min-width: 1920px) {
			--foxui-container---max-width: 1800px;
		}

		@media (min-width: 2560px) {
			--foxui-container---max-width: 2400px;
		}

		&--fluid {
			--foxui-container---max-width: 100%;
		}

		&--fullscreen {
			--foxui-container---max-width: 100%;
			--foxui-container---height: 100%;
			--foxui-container---align-items: center;
			--foxui-container---display: flex;
		}
	}
</style>

<style>
	:root {
		--foxui-container---box-sizing: border-box;

		--foxui-container---width: auto;
		--foxui-container---max-width: 100%;
		--foxui-container---min-width: 0;
		--foxui-container---height: auto;
		--foxui-container---max-height: 100%;
		--foxui-container---min-height: 0;

		--foxui-container---padding-block-start: 16px;
		--foxui-container---padding-block-end: 16px;
		--foxui-container---padding-inline-start: 16px;
		--foxui-container---padding-inline-end: 16px;

		--foxui-container---margin-block-start: 0;
		--foxui-container---margin-block-end: 0;
		--foxui-container---margin-inline-end: auto;
		--foxui-container---margin-inline-start: auto;

		--foxui-container---align-items: auto;
		--foxui-container---display: block;
	}
</style>
