<template>
	<component
			:is="tag"
			:class="btnGroupClasses"
			:style="btnGroupStyles"
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
						<foxy-btn v-bind="item"/>
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
	import { FoxyBtn } from '@foxy/components'
	import { useBorder, useDensity, useElevation, useProps, useRounded } from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import type { IBtnGroupProps, IBtnProps } from '@foxy/interfaces'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBtnGroupProps>(), {tag: 'div', density: DENSITY.DEFAULT, items: () => []})

	const {filterProps} = useProps<IBtnGroupProps>(props)

	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)

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
			props.style
		] as StyleValue
	})
	const btnGroupClasses = computed(() => {
		return [
			'foxy-btn-group',
			{
				'foxy-btn-group--divided': props.divided
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
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
	.foxy-btn-group {
		display: inline-flex;
		flex-wrap: nowrap;
		max-width: 100%;
		min-width: 0;
		overflow: hidden;
		vertical-align: middle;
		border-color: currentColor;
		border-style: solid;
		border-width: 0;
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		border-radius: 4px;
		min-height: calc(var(--foxy-btn---height, 36px) + var(--foxy-btn---density, 0));

		&--bordered {
			border-width: thin;
			box-shadow: none;
		}

		&--density-default {

		}

		&--density-compact {

		}

		:deep(.foxy-btn) {
			border-radius: 0;
			border-color: inherit;

			&:not(:last-child) {
				border-inline-end: none;
			}

			&:not(:first-child) {
				border-inline-start: none;
			}

			&:first-child {
				border-start-start-radius: inherit;
				border-end-start-radius: inherit;
			}

			&:last-child {
				border-start-end-radius: inherit;
				border-end-end-radius: inherit;
			}
		}

		&--divided {
			:deep(.foxy-btn) {
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

	}
</style>
