<template>
	<div
			:class="responsiveClasses"
			:style="responsiveStyles"
	>
		<div
				:style="aspectStyles"
				class="foxui-responsive__sizer"
		/>
		<slot name="additional"/>
		<div
				v-if="slots.default"
				:class="responsiveContentClasses"
		>
			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import {
		useAspectRatio,
		useBorder,
		useDimension,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '@foxui/composables'

	import type { IResponsiveProps } from '@foxui/interfaces'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IResponsiveProps>(), {})

	const {filterProps} = useProps<IResponsiveProps>(props)

	const {aspectStyles} = useAspectRatio(props)
	const {dimensionStyles} = useDimension(props)
	const slots = useSlots()
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const responsiveStyles = computed(() => {
		return [
			dimensionStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const responsiveClasses = computed(() => {
		return [
			'foxui-responsive',
			{'foxui-responsive--inline': props.inline},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const responsiveContentClasses = computed(() => {
		return [
			'foxui-responsive__content',
			props.contentClass
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
	.foxui-responsive {
		$this: &;

		display: var(--foxui-responsive---display);
		flex: var(--foxui-responsive---flex);
		max-height: var(--foxui-responsive---max-height);
		max-width: var(--foxui-responsive---max-width);
		min-width: var(--foxui-responsive---min-width);
		min-height: var(--foxui-responsive---min-width);
		overflow: var(--foxui-responsive---overflow);
		position: var(--foxui-responsive---position);
		width: var(--foxui-responsive---width);
		height: var(--foxui-responsive---height);

		&--inline {
			display: var(--foxui-responsive--inline---display);
			flex: var(--foxui-responsive--inline---flex);
		}

		&__content {
			flex: var(--foxui-responsive__content---flex);
			max-width: var(--foxui-responsive__content---max-width);
			margin: var(--foxui-responsive__content---margin);
		}

		&__sizer {
			flex: var(--foxui-responsive__sizer---flex);
			transition: var(--foxui-responsive__sizer---transition);
			pointer-events: var(--foxui-responsive__sizer---pointer-events);
			padding-block-end: var(--foxui-responsive__sizer---padding-block-end);

			~ #{$this}__content {
				--foxui-responsive__content---margin-inline-start: -100%
			}
		}
	}
</style>

<style>
	:root {
		--foxui-responsive---display: flex;
		--foxui-responsive---flex: 1 0 auto;
		--foxui-responsive---max-height: 100%;
		--foxui-responsive---max-width: 100%;
		--foxui-responsive---min-height: 0;
		--foxui-responsive---min-width: 0;
		--foxui-responsive---width: auto;
		--foxui-responsive---height: auto;
		--foxui-responsive---overflow: hidden;
		--foxui-responsive---position: relative;

		--foxui-responsive--inline---display: inline-flex;
		--foxui-responsive--inline---flex: 0 0 auto;

		--foxui-responsive__content---flex: 1 0 0px;
		--foxui-responsive__content---max-width: 100%;
		--foxui-responsive__content---margin-block-start: 0;
		--foxui-responsive__content---margin-block-end: 0;
		--foxui-responsive__content---margin-block: var(--foxui-responsive__content---margin-block-start) var(--foxui-responsive__content---margin-block-end);
		--foxui-responsive__content---margin-inline-start: 0;
		--foxui-responsive__content---margin-inline-end: 0;
		--foxui-responsive__content---margin-inline: var(--foxui-responsive__content---margin-inline-start) var(--foxui-responsive__content---margin-inline-end);
		--foxui-responsive__content---margin: var(--foxui-responsive__content---margin-block) var(--foxui-responsive__content---margin-inline);

		--foxui-responsive__sizer---flex: 1 0 0px;
		--foxui-responsive__sizer---transition-properties: padding-bottom;
		--foxui-responsive__sizer---transition-duration: 0.2s;
		--foxui-responsive__sizer---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-responsive__sizer---transition: var(--foxui-responsive__sizer---transition-properties) var(--foxui-responsive__sizer---transition-duration) var(--foxui-responsive__sizer---transition-timing-function);
		--foxui-responsive__sizer---pointer-events: none;
		--foxui-responsive__sizer---padding-block-end: 0;
	}
</style>
