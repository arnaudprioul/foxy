<template>
	<component
			:is="tag"
			:class="rowClasses"
			:style="rowStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps } from '@foxui/composables'
	import { DENSITY } from '@foxui/enums'

	import type { IRowProps } from '@foxui/interfaces'

	import { toKebabCase } from '@foxui/utils'

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IRowProps>(), {tag: 'div', density: DENSITY.DEFAULT})

	const {filterProps} = useProps<IRowProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASSES & STYLES

	const rowStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const rowClasses = computed(() => {
		const classes = [
			'foxui-row',
			{
				[`foxui-row--align-${props.align}`]: props.align,
				[`foxui-row--justify-${props.justify}`]: props.justify
			},
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
		const propMap = {
			align: ['alignSm', 'alignMd', 'alignLg', 'alignXl', 'alignXxl'],
			justify: ['justifySm', 'justifyMd', 'justifyLg', 'justifyXl', 'justifyXxl']
		}

		for (const type in propMap) {
			propMap[type as keyof typeof propMap].forEach((prop) => {
				if (props[prop as keyof typeof props]) classes.push(`foxui-row--${toKebabCase(prop)} : ${props[prop as keyof typeof props]}`)
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
	$justifies: ('start': flex-start, 'end': flex-end, 'center': center, 'space-between': space-between, 'space-around': space-around, 'space-evenly': space-evenly);
	$aligns: ('start': flex-start, 'end': flex-end, 'center': center, 'baseline': baseline, 'stretch': stretch);

	.foxui-row {
		display: var(--foxui-row---display);
		flex-wrap: var(--foxui-row---flex-wrap);
		flex: var(--foxui-row---flex);
		align-items: var(--foxui-row---align-items);
		justify-content: var(--foxui-row---justify-content);
		box-sizing: var(--foxui-row---box-sizing);

		padding-block-start: var(--foxui-container---padding-block-start);
		padding-block-end: var(--foxui-container---padding-block-end);
		padding-inline-start: var(--foxui-container---padding-inline-start);
		padding-inline-end: var(--foxui-container---padding-inline-end);

		margin-block-start: calc(var(--foxui-row---margin-block-start) + var(--foxui-row---density));
		margin-block-end: calc(var(--foxui-row---margin-block-end) + var(--foxui-row---density));
		margin-inline-start: calc(var(--foxui-row---margin-inline-start) + var(--foxui-row---density));
		margin-inline-end: calc(var(--foxui-row---margin-inline-end) + var(--foxui-row---density));

		+ .v-row {
			margin-block-start: calc((var(--foxui-row---margin-block-start) + var(--foxui-row---density)) * -1);
		}

		&--density-default {
			--foxui-row---density: -8px;

			> .foxui-col,
			> [class*=foxui-col-] {
				// padding 4px
			}
		}

		&--density-compact {
			--foxui-row---density: 0;

			> .foxui-col,
			> [class*=foxui-col-] {
				// padding 4px
			}
		}

		&--border {
			border-width: var(--foxui-row--border---border-width);
			box-shadow: var(--foxui-row--border---box-shadow);
		}

		@each $align, $alignAttr in $aligns {
			&--align-#{$align} {
				--foxui-row---align-items: #{$alignAttr};
			}
		}

		@each $justify, $justifyAttr in $justifies {
			&--justify-#{$justify} {
				--foxui-row---justify-content: #{$justifyAttr};
			}
		}

		@each $breakpoint, $breakpointSize in $breakpoints {
			@each $align, $alignAttr in $aligns {
				&--align-#{$breakpoint}-#{$align} {
					@media (min-width: $breakpointSize) {
						--foxui-row---align-items: #{$alignAttr};
					}
				}
			}

			@each $justify, $justifyAttr in $justifies {
				&--justify-#{$breakpoint}-#{$justify} {
					@media (min-width: $breakpointSize) {
						--foxui-row---justify-content: #{$justifyAttr};
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-row---display: flex;
		--foxui-row---flex-wrap: wrap;
		--foxui-row---flex: 1 1 auto;

		--foxui-row---box-sizing: border-box;

		--foxui-row---padding-block-start: 0;
		--foxui-row---padding-block-end: 0;
		--foxui-row---padding-inline-start: 0;
		--foxui-row---padding-inline-end: 0;

		--foxui-row---margin-block-start: -4px;
		--foxui-row---margin-block-end: -4px;
		--foxui-row---margin-inline-start: -4px;
		--foxui-row---margin-inline-end: -4px;

		--foxui-row---align-items: stretch;
		--foxui-row---justify-content: flex-start
	}
</style>
