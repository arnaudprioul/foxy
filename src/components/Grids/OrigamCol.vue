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
	import { useBorder, useBothColor, useMargin, usePadding, useProps } from '../../composables'

	import type { IColProps } from '../../interfaces'

	import { toKebabCase } from '../../utils'

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
			'origam-col',
			{
				[`origam-col--align-${props.align}`]: props.align
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
			classes.push(`origam-col--${props.cols}`)
		}

		for (const type in propMap) {
			propMap[type as keyof typeof propMap].forEach((prop) => {
				if (props[prop as keyof typeof props]) classes.push(`origam-col--${toKebabCase(prop)}-${props[prop as keyof typeof props]}`)
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
		width: var(--origam-col---width);

		padding-block-start: var(--origam-col---padding-block-start);
		padding-block-end: var(--origam-col---padding-block-end);
		padding-inline-start: var(--origam-col---padding-inline-start);
		padding-inline-end: var(--origam-col---padding-inline-end);

		margin-block-start: var(--origam-col---margin-block-start);
		margin-block-end: var(--origam-col---margin-block-end);
		margin-inline-start: var(--origam-col---margin-inline-start);
		margin-inline-end: var(--origam-col---margin-inline-end);
	}

	.origam-col {
		$this: &;

		@extend %default;
		flex-grow: var(--origam-col---flex-grow);
		flex-shrink: var(--origam-col---flex-shrink);
		flex-basis: var(--origam-col---flex-basis);
		align-self: var(--origam-col---align-self);

		max-width: var(--origam-col---max-width);
		box-sizing: var(--origam-col---box-sizing);

		background-color: var(--origam-col---background-color);
		color: var(--origam-col---color);

		&--auto {
			@extend %default;

			--origam-col---flex-grow: 0;
			--origam-col---flex-basis: auto;
			--origam-col---width: auto;
			--origam-col---max-width: 100%;
		}

		@each $size in $sizes {
			&--#{$size} {
				@extend %default;

				--origam-col---flex-basis: #{calc(100% / calc(12 / $size))};
				--origam-col---max-width: #{calc(100% / calc(12 / $size))};
			}

			@if ($size != 12) {
				&--offset-#{$size} {
					--origam-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
				}
			}
		}
		@each $align, $alignAttr in $aligns {
			&--align-#{$align} {
				--origam-col---align-self: #{$alignAttr};
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
						--origam-col---flex-basis: #{calc(100% / calc(12 / $size))};
						--origam-col---max-width: #{calc(100% / calc(12 / $size))};
					}
				}

				@if ($size != 12) {
					&--offset-#{$breakpoint}-#{$size} {
						@media (min-width: $breakpointSize) {
							--origam-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
						}
					}
				}
			}
			@each $align, $alignAttr in $aligns {
				&--align-#{$breakpoint}-#{$align} {
					@media (min-width: $breakpointSize) {
						--origam-col---align-self: #{$alignAttr};
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-col---width: 100%;

		--origam-col---box-sizing: border-box;

		--origam-col---padding-block-start: 12px;
		--origam-col---padding-block-end: 12px;
		--origam-col---padding-inline-start: 12px;
		--origam-col---padding-inline-end: 12px;

		--origam-col---margin-block-start: 0;
		--origam-col---margin-block-end: 0;
		--origam-col---margin-inline-start: 0;
		--origam-col---margin-inline-end: 0;

		--origam-col---flex-basis: 0;
		--origam-col---flex-shrink: 0;
		--origam-col---flex-grow: 1;
		--origam-col---max-width: 100%;

		--origam-col---background-color: transparent;
		--origam-col---color: #000;

		--origam-col---align-self: auto;
	}
</style>
