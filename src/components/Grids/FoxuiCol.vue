<template>
	<component
			:is="tag"
			:class="colClasses"
			:style="colStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useBorder, useBothColor, useMargin, usePadding, useProps } from '@foxui/composables'

	import type { IColProps } from '@foxui/interfaces'

	import { toKebabCase } from '@foxui/utils'

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IColProps>(), {tag: 'div'})

	const {filterProps} = useProps<IColProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASSES & STYLES

	const colStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const colClasses = computed(() => {
		const classes = [
			'foxui-col',
			{
				[`foxui-col--align-${props.align}`]: props.align
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
		const propMap = {
			align: ['alignSm', 'alignSm', 'alignLg', 'alignXl', 'alignXxl'],
			justify: ['justifySm', 'justifyMd', 'justifyLg', 'justifyXl', 'justifyXxl'],
			offset: ['offsetSm', 'offsetMd', 'offsetLg', 'offsetXl', 'offsetXxl'],
			order: ['orderSm', 'orderMd', 'orderLg', 'orderXl', 'orderXxl'],
			grid: ['sm', 'md', 'lg', 'xl', 'xxl']
		}

		if (props.cols) {
			classes.push(`foxui-col--${props.cols}`)
		}

		for (const type in propMap) {
			propMap[type as keyof typeof propMap].forEach((prop) => {
				if (props[prop as keyof typeof props]) classes.push(`foxui-col--${toKebabCase(prop)}-${props[prop as keyof typeof props]}`)
			})
		}

		return classes
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
	$breakpoints: ('sm': 600px, 'md': 960px, 'lg': 1280px, 'xl': 1920px, 'xxl': 2560px);
	$sizes: 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1;
	$aligns: ('start': flex-start, 'end': flex-end, 'center': center, 'baseline': baseline, 'stretch': stretch);

	%default {
		width: var(--foxui-col---width);

		padding-block-start: var(--foxui-col---padding-block-start);
		padding-block-end: var(--foxui-col---padding-block-end);
		padding-inline-start: var(--foxui-col---padding-inline-start);
		padding-inline-end: var(--foxui-col---padding-inline-end);

		margin-block-start: var(--foxui-col---margin-block-start);
		margin-block-end: var(--foxui-col---margin-block-end);
		margin-inline-start: var(--foxui-col---margin-inline-start);
		margin-inline-end: var(--foxui-col---margin-inline-end);
	}

	.foxui-col {
		$this: &;

		@extend %default;
		flex-grow: var(--foxui-col---flex-grow);
		flex-shrink: var(--foxui-col---flex-shrink);
		flex-basis: var(--foxui-col---flex-basis);
		align-self: var(--foxui-col---align-self);

		max-width: var(--foxui-col---max-width);
		box-sizing: var(--foxui-col---box-sizing);

		background-color: var(--foxui-col---background-color);
		color: var(--foxui-col---color);

		&--auto {
			@extend %default;

			--foxui-col---flex-grow: 0;
			--foxui-col---flex-basis: auto;
			--foxui-col---width: auto;
			--foxui-col---max-width: 100%;
		}

		@each $size in $sizes {
			&--#{$size} {
				@extend %default;

				--foxui-col---flex-basis: #{calc(100% / calc(12 / $size))};
				--foxui-col---max-width: #{calc(100% / calc(12 / $size))};
			}

			@if ($size != 12) {
				&--offset-#{$size} {
					--foxui-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
				}
			}
		}
		@each $align, $alignAttr in $aligns {
			&--align-#{$align} {
				--foxui-col---align-self: #{$alignAttr};
			}
		}

		@each $breakpoint, $breakpointSize in $breakpoints {
			&--#{$breakpoint}-auto {
				@extend %default;

				@media (min-width: $breakpointSize) {
					flex: 0 0 auto;
					width: auto;
					max-width: 100%;
				}
			}

			@each $size in $sizes {
				&--#{$breakpoint}-#{$size} {
					@extend %default;

					@media (min-width: $breakpointSize) {
						--foxui-col---flex-basis: #{calc(100% / calc(12 / $size))};
						--foxui-col---max-width: #{calc(100% / calc(12 / $size))};
					}
				}

				@if ($size != 12) {
					&--offset-#{$breakpoint}-#{$size} {
						@media (min-width: $breakpointSize) {
							--foxui-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
						}
					}
				}
			}
			@each $align, $alignAttr in $aligns {
				&--align-#{$breakpoint}-#{$align} {
					@media (min-width: $breakpointSize) {
						--foxui-col---align-self: #{$alignAttr};
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-col---width: 100%;

		--foxui-col---box-sizing: border-box;

		--foxui-col---padding-block-start: 12px;
		--foxui-col---padding-block-end: 12px;
		--foxui-col---padding-inline-start: 12px;
		--foxui-col---padding-inline-end: 12px;

		--foxui-col---margin-block-start: 0;
		--foxui-col---margin-block-end: 0;
		--foxui-col---margin-inline-start: 0;
		--foxui-col---margin-inline-end: 0;

		--foxui-col---flex-basis: 0;
		--foxui-col---flex-shrink: 0;
		--foxui-col---flex-grow: 1;
		--foxui-col---max-width: 100%;

		--foxui-col---background-color: transparent;
		--foxui-col---color: #000;

		--foxui-col---align-self: auto;
	}
</style>
