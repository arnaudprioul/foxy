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
	import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps } from '@/composables'
	import { DENSITY } from '@/enums'

	import type { IRowProps } from '@/interfaces'

	import { toKebabCase } from '@/utils'

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
			'origam-row',
			{
				[`origam-row--align-${props.align}`]: props.align,
				[`origam-row--justify-${props.justify}`]: props.justify
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
				if (props[prop as keyof typeof props]) classes.push(`origam-row--${toKebabCase(prop)} : ${props[prop as keyof typeof props]}`)
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

	.origam-row {
		display: var(--origam-row---display);
		flex-wrap: var(--origam-row---flex-wrap);
		flex: var(--origam-row---flex);
		align-items: var(--origam-row---align-items);
		justify-content: var(--origam-row---justify-content);
		box-sizing: var(--origam-row---box-sizing);

		padding-block-start: var(--origam-container---padding-block-start);
		padding-block-end: var(--origam-container---padding-block-end);
		padding-inline-start: var(--origam-container---padding-inline-start);
		padding-inline-end: var(--origam-container---padding-inline-end);

		margin-block-start: calc(var(--origam-row---margin-block-start) + var(--origam-row---density));
		margin-block-end: calc(var(--origam-row---margin-block-end) + var(--origam-row---density));
		margin-inline-start: calc(var(--origam-row---margin-inline-start) + var(--origam-row---density));
		margin-inline-end: calc(var(--origam-row---margin-inline-end) + var(--origam-row---density));

		+ .v-row {
			margin-block-start: calc((var(--origam-row---margin-block-start) + var(--origam-row---density)) * -1);
		}

		&--density-default {
			--origam-row---density: -8px;

			> .origam-col,
			> [class*=origam-col-] {
				// padding 4px
			}
		}

		&--density-compact {
			--origam-row---density: 0;

			> .origam-col,
			> [class*=origam-col-] {
				// padding 4px
			}
		}

		&--border {
			border-width: var(--origam-row--border---border-width);
			box-shadow: var(--origam-row--border---box-shadow);
		}

		@each $align, $alignAttr in $aligns {
			&--align-#{$align} {
				--origam-row---align-items: #{$alignAttr};
			}
		}

		@each $justify, $justifyAttr in $justifies {
			&--justify-#{$justify} {
				--origam-row---justify-content: #{$justifyAttr};
			}
		}

		@each $breakpoint, $breakpointSize in $breakpoints {
			@each $align, $alignAttr in $aligns {
				&--align-#{$breakpoint}-#{$align} {
					@media (min-width: $breakpointSize) {
						--origam-row---align-items: #{$alignAttr};
					}
				}
			}

			@each $justify, $justifyAttr in $justifies {
				&--justify-#{$breakpoint}-#{$justify} {
					@media (min-width: $breakpointSize) {
						--origam-row---justify-content: #{$justifyAttr};
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-row---display: flex;
		--origam-row---flex-wrap: wrap;
		--origam-row---flex: 1 1 auto;

		--origam-row---box-sizing: border-box;

		--origam-row---padding-block-start: 0;
		--origam-row---padding-block-end: 0;
		--origam-row---padding-inline-start: 0;
		--origam-row---padding-inline-end: 0;

		--origam-row---margin-block-start: -4px;
		--origam-row---margin-block-end: -4px;
		--origam-row---margin-inline-start: -4px;
		--origam-row---margin-inline-end: -4px;

		--origam-row---align-items: stretch;
		--origam-row---justify-content: flex-start
	}
</style>
