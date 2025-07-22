<template>
	<component
			:is="tag"
			:class="systemBarClasses"
			:style="systemBarStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, shallowRef, StyleValue, toRef } from "vue"
	import {
		useBorder,
		useBothColor,
		useDimension,
		useElevation,
		useLayoutItem,
		useProps,
		useRounded,
		useSsrBoot
	} from "../../composables"

	import type { ISystemBarProps } from "../../interfaces"

	const props = withDefaults(defineProps<ISystemBarProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<ISystemBarProps>(props)

	const {dimensionStyles} = useDimension(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {roundedStyles, roundedClasses} = useRounded(props)
	const {elevationClasses} = useElevation(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const {ssrBootStyles} = useSsrBoot()
	const height = computed(() => props.height ?? (props.window ? 32 : 24))
	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => parseInt(props.order, 10)),
		position: shallowRef('top'),
		layoutSize: height,
		elementSize: height,
		active: computed(() => true),
		absolute: toRef(props, 'absolute')
	})

	// CLASS & STYLES

	const systemBarStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			dimensionStyles.value,
			colorStyles.value,
			ssrBootStyles.value,
			layoutItemStyles.value,
			props.style
		] as StyleValue
	})
	const systemBarClasses = computed(() => {
		return [
			'origam-system-bar',
			{
				'origam-system-bar--window': props.window
			},
			borderClasses.value,
			roundedClasses.value,
			elevationClasses.value,
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
	.origam-system-bar {
		align-items: center;
		display: flex;
		flex: 1 1 auto;
		height: 24px;
		justify-content: flex-end;
		max-width: 100%;
		padding-inline: 8px;
		position: relative;
		text-align: end;
		width: 100%;
		background: rgba(66, 66, 66, 1);
		color: rgba(255, 255, 255, 1);
		font-size: .75rem;
		font-weight: 400;
		letter-spacing: .0333333333em;
		line-height: 1.667;
		text-transform: none;

		.origam-icon {
			opacity: 0.7;
		}

		&--absolute {
			position: absolute;
		}

		&--fixed {
			position: fixed;
		}

		&--rounded {
			border-radius: 0;
		}

		&--window {
			height: 32px;
		}
	}
</style>

<style>
	:root {

	}
</style>
