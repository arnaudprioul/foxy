<template>
	<component
			:is="tag"
			:class="mainClasses"
			:style="mainStyles"
	>
		<div
				:class="{'foxui-main__scroller': props.scrollable}"
				class="foxui-main__wrapper"
		>
			<slot name="default"/>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useBorder, useLayout, useMargin, usePadding, useProps, useRounded, useSsrBoot } from '@foxui/composables'

	import type { IMainProps } from '@foxui/interfaces'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IMainProps>(), {tag: 'main'})

	const {filterProps} = useProps<IMainProps>(props)

	const {mainStyles: mainLayoutStyles} = useLayout()
	const {ssrBootStyles} = useSsrBoot()
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const mainStyles = computed(() => {
		return [
			mainLayoutStyles.value,
			ssrBootStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const mainClasses = computed(() => {
		return [
			'foxui-main',
			{
				'foxui-main--scrollable': props.scrollable
			},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
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
	.foxui-main {
		$this: &;

		flex: var(--foxui-main--flex);
		max-width: var(--foxui-main--max-width);
		transition-duration: var(--foxui-main--transition-duration);
		transition-property: var(--foxui-main--transition-property);
		transition-timing-function: var(--foxui-main--transition-timing-function);
		padding-inline-start: var(--foxui-layout---position-left);
		padding-inline-end: var(--foxui-layout---position-right);
		padding-block-start: var(--foxui-layout---position-top);
		padding-block-end: var(--foxui-layout---position-bottom);

		&__scroller {
			max-width: var(--foxui-main__scroller--max-width);
			position: var(--foxui-main__scroller--position);
		}

		&--scrollable {
			display: var(--foxui-main--display);
			position: var(--foxui-main--position);
			top: var(--foxui-main--position-top);
			left: var(--foxui-main--position-left);
			width: var(--foxui-main--width);
			height: var(--foxui-main--height);

			#{$this}__scroller {
				flex: 1 1 auto;
				overflow-y: auto;

				--foxui-layout---position-left: 0px;
				--foxui-layout---position-right: 0px;
				--foxui-layout---position-top: 0px;
				--foxui-layout---position-bottom: 0px;
			}
		}
	}
</style>

<style>
	:root {
		--foxui-main--flex: 1 0 auto;

		--foxui-main--transition-duration: 0.2s;
		--foxui-main--transition-property: all;
		--foxui-main--transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--foxui-main--max-width: 100%;
		--foxui-main--width: 100%;
		--foxui-main--height: 100%;

		--foxui-main--display: flex;

		--foxui-main--position: absolute;
		--foxui-main--position-top: 0;
		--foxui-main--position-left: 0;

		--foxui-main__scroller--position: relative;
		--foxui-main__scroller--max-width: 100%;
	}
</style>
