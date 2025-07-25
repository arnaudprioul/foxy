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
						<origam-btn v-bind="item"/>
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
	import { OrigamBtn } from '../../components'
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
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IBtnGroupProps, IBtnProps } from '../../interfaces'

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
			'origam-btn-group',
			{
				'origam-btn-group--divided': props.divided
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
	.origam-btn-group {
		display: inline-flex;
		flex-wrap: nowrap;
		overflow: hidden;
		vertical-align: middle;

		max-width: 100%;
		min-width: 0;
		min-height: calc(var(--origam-btn-group---height, 36px) + var(--origam-btn-group---density, 0));

		border-width: var(--origam-btn-group---border-width);
		border-style: var(--origam-btn-group---border-style);
		border-color: var(--origam-btn-group---border-color);
		border-radius: var(--origam-btn-group---border-radius, 4px);

		background-color: var(--origam-btn-group---background-color);
		color: var(--origam-btn-group---color);

		&--border {
			--origam-btn-group---border-width: thin;
		}

		&--rounded {
			--origam-btn-group---border-radius: 24px;
		}

		&--density-comfortable {
			--origam-btn-group---density: 8px;
		}

		&--density-default {
			--origam-btn-group---density: 0px;
		}

		&--density-compact {
			--origam-btn-group---density: 8px;
		}

		:deep(.origam-btn) {
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
			:deep(.origam-btn) {
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
		--origam-btn-group---density: 0;

		--origam-btn-group---border-radius: 4px;
		--origam-btn-group---border-width: 0;
		--origam-btn-group---border-style: solid;
		--origam-btn-group---border-color: currentColor;

	}
</style>
