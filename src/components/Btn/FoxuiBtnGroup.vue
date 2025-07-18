<template>
	<component
			:is="tag"
			:id="id"
			:class="btnGroupClasses"
	>
		<slot name="default">
			<template v-if="hasItems">
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<slot
							name="item"
							v-bind="{item, index}"
					>
						<foxui-btn v-bind="item"/>
					</slot>
				</template>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiBtn } from '@foxui/components'
	import {
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useStyle
	} from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { IBtnGroupProps, IBtnProps } from '@foxui/interfaces'

	import { computed, ref, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBtnGroupProps>(), {tag: 'div', density: DENSITY.DEFAULT, items: () => []})

	const {filterProps} = useProps<IBtnGroupProps>(props)

	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {colorStyles, bgColor} = useColorEffect(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const items = computed(() => {
		return props.items?.map((item) => {
			return {
				...item,
				density: props.density ?? item.density,
				color: props.color ?? item.color,
				bgColor: props.bgColor ?? item.bgColor,
				activeColor: props.activeColor ?? item.activeColor,
				activeBgColor: props.activeBgColor ?? item.activeBgColor,
				hoverColor: props.hoverColor ?? item.hoverColor,
				hoverBgColor: props.hoverBgColor ?? item.hoverBgColor
			}
		}) as Array<IBtnProps>
	})

	const slots = useSlots()
	const hasItems = computed(() => {
		return slots.default || !!items.value
	})

	// CLASS & STYLES

	const btnGroupStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			colorStyles.value,
			marginStyles.value,
			paddingStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const btnGroupClasses = computed(() => {
		return [
			'foxui-btn-group',
			{
				'foxui-btn-group--divided': props.divided
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			marginClasses.value,
			paddingClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(btnGroupStyles)

	// EXPOSE

	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-btn-group {
		display: inline-flex;
		flex-wrap: nowrap;
		overflow: hidden;
		vertical-align: middle;

		max-width: 100%;
		min-width: 0;
		min-height: calc(var(--foxui-btn-group---height, 36px) + var(--foxui-btn-group---density, 0));

		border-width: var(--foxui-btn-group---border-width);
		border-style: var(--foxui-btn-group---border-style);
		border-color: var(--foxui-btn-group---border-color);
		border-radius: var(--foxui-btn-group---border-radius, 4px);

		background-color: var(--foxui-btn-group---background-color);
		color: var(--foxui-btn-group---color);

		&--border {
			--foxui-btn-group---border-width: thin;
		}

		&--rounded {
			--foxui-btn-group---border-radius: 24px;
		}

		&--density-comfortable {
			--foxui-btn-group---density: 8px;
		}

		&--density-default {
			--foxui-btn-group---density: 0px;
		}

		&--density-compact {
			--foxui-btn-group---density: 8px;
		}

		:deep(.foxui-btn) {
			border-radius: 0;
			border-color: inherit;

			&:not(:last-child) {
				border-inline-end: none;
			}

			&:not(:first-child) {
				border-inline-start: none;
			}
		}

		&--divided {
			:deep(.foxui-btn) {
				&:not(:last-child) {
					border-inline-end-width: thin;
					border-inline-end-style: solid;
					border-inline-end-color: rgba(var(--v-border-color), var(--v-border-opacity));
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-btn-group---density: 0;

		--foxui-btn-group---border-radius: 4px;
		--foxui-btn-group---border-width: 0;
		--foxui-btn-group---border-style: solid;
		--foxui-btn-group---border-color: currentColor;

	}
</style>
