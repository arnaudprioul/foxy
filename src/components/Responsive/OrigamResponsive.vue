<template>
	<div
			:class="responsiveClasses"
			:style="responsiveStyles"
	>
		<div
				:style="aspectStyles"
				class="origam-responsive__sizer"
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
	} from '@origam/composables'

	import type { IResponsiveProps } from '@origam/interfaces'

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
			'origam-responsive',
			{'origam-responsive--inline': props.inline},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const responsiveContentClasses = computed(() => {
		return [
			'origam-responsive__content',
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
	.origam-responsive {
		$this: &;

		display: var(--origam-responsive---display);
		flex: var(--origam-responsive---flex);
		max-height: var(--origam-responsive---max-height);
		max-width: var(--origam-responsive---max-width);
		min-width: var(--origam-responsive---min-width);
		min-height: var(--origam-responsive---min-width);
		overflow: var(--origam-responsive---overflow);
		position: var(--origam-responsive---position);
		width: var(--origam-responsive---width);
		height: var(--origam-responsive---height);

		&--inline {
			display: var(--origam-responsive--inline---display);
			flex: var(--origam-responsive--inline---flex);
		}

		&__content {
			flex: var(--origam-responsive__content---flex);
			max-width: var(--origam-responsive__content---max-width);
			margin: var(--origam-responsive__content---margin);
		}

		&__sizer {
			flex: var(--origam-responsive__sizer---flex);
			transition: var(--origam-responsive__sizer---transition);
			pointer-events: var(--origam-responsive__sizer---pointer-events);
			padding-block-end: var(--origam-responsive__sizer---padding-block-end);

			~ #{$this}__content {
				--origam-responsive__content---margin-inline-start: -100%
			}
		}
	}
</style>

<style>
	:root {
		--origam-responsive---display: flex;
		--origam-responsive---flex: 1 0 auto;
		--origam-responsive---max-height: 100%;
		--origam-responsive---max-width: 100%;
		--origam-responsive---min-height: 0;
		--origam-responsive---min-width: 0;
		--origam-responsive---width: auto;
		--origam-responsive---height: auto;
		--origam-responsive---overflow: hidden;
		--origam-responsive---position: relative;

		--origam-responsive--inline---display: inline-flex;
		--origam-responsive--inline---flex: 0 0 auto;

		--origam-responsive__content---flex: 1 0 0px;
		--origam-responsive__content---max-width: 100%;
		--origam-responsive__content---margin-block-start: 0;
		--origam-responsive__content---margin-block-end: 0;
		--origam-responsive__content---margin-block: var(--origam-responsive__content---margin-block-start) var(--origam-responsive__content---margin-block-end);
		--origam-responsive__content---margin-inline-start: 0;
		--origam-responsive__content---margin-inline-end: 0;
		--origam-responsive__content---margin-inline: var(--origam-responsive__content---margin-inline-start) var(--origam-responsive__content---margin-inline-end);
		--origam-responsive__content---margin: var(--origam-responsive__content---margin-block) var(--origam-responsive__content---margin-inline);

		--origam-responsive__sizer---flex: 1 0 0px;
		--origam-responsive__sizer---transition-properties: padding-bottom;
		--origam-responsive__sizer---transition-duration: 0.2s;
		--origam-responsive__sizer---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-responsive__sizer---transition: var(--origam-responsive__sizer---transition-properties) var(--origam-responsive__sizer---transition-duration) var(--origam-responsive__sizer---transition-timing-function);
		--origam-responsive__sizer---pointer-events: none;
		--origam-responsive__sizer---padding-block-end: 0;
	}
</style>
