<template>
	<component
			:is="tag"
			:id="id"
			aria-label="Breadcrumb"
			:class="breadcrumbClasses"
	>
		<slot name="default">
			<template v-if="hasItems">
				<ol class="foxy-breadcrumb__items">
					<template
							v-for="(item, index) in items"
							:key="index"
					>
						<li class="foxy-breadcrumb__item">
							<slot
									:name="`item.${index}`"
									v-bind="{item, index}"
							>
								<slot
										name="item"
										v-bind="{ item, index }"
								>
									<foxy-breadcrumb-item v-bind="item">
										<slot name="item.title"/>
									</foxy-breadcrumb-item>
								</slot>
							</slot>

							<template v-if="!isLastItem(index)">
								<slot
										:name="`divider.${index}`"
										v-bind="{divider}"
								>
									<slot
											name="divider"
											v-bind="{divider}"
									>
										<foxy-breadcrumb-divider :divider="divider"/>
									</slot>
								</slot>
							</template>
						</li>
					</template>
				</ol>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBreadcrumbDivider, FoxyBreadcrumbItem } from '@foxy/components'

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
	} from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import type { IBreadcrumbItemProps, IBreadcrumbProps } from '@foxy/interfaces'

	import type { TBreadcrumbItem } from '@foxy/types'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbProps>(), {
		divider: '/',
		items: () => [] as Array<TBreadcrumbItem>,
		tag: 'nav',
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<IBreadcrumbProps>(props)

	const {colorStyles} = useColorEffect(props)
	const {densityClasses} = useDensity(props)
	const {elevationStyles, elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const items = computed(() => {
		return props.items.map((item, index) => {
			return typeof item === 'string' ? {title: item, disabled: isLastItem(index)} : {
				...item,
				density: props.density ?? item.density,
				disabled: isLastItem(index) || item.disabled,
				isActive: isLastItem(index)
			}
		}) as Array<IBreadcrumbItemProps>
	})
	const isLastItem = (index: number) => {
		return index === props.items.length - 1
	}

	const slots = useSlots()
	const hasItems = computed(() => {
		return slots.default || items.value
	})

	// CLASS & STYLES

	const breadcrumbStyles = computed(() => {
		return [
			elevationStyles.value,
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const breadcrumbClasses = computed(() => {
		return [
			'foxy-breadcrumb',
			elevationClasses.value,
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(breadcrumbStyles)

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
	.foxy-breadcrumb {
		transition: var(--foxy-breadcrumb---transition);

		background: var(--foxy-breadcrumb---background);
		box-shadow: var(--foxy-breadcrumb---box-shadow);
		color: var(--foxy-breadcrumb---color);

		border-color: var(--foxy-breadcrumb---border-color);
		border-style: var(--foxy-breadcrumb---border-style);
		border-width: var(--foxy-breadcrumb---border-width);
		border-radius: var(--foxy-breadcrumb---border-radius);

		padding-block-start: calc(var(--foxy-breadcrumb---padding-block-start) - var(--foxy-breadcrumb---density));
		padding-block-end: calc(var(--foxy-breadcrumb---padding-block-end) - var(--foxy-breadcrumb---density));
		padding-inline-start: calc(var(--foxy-breadcrumb---padding-inline-start) - var(--foxy-breadcrumb---density));
		padding-inline-end: calc(var(--foxy-breadcrumb---padding-inline-end) - var(--foxy-breadcrumb---density));

		margin-block-start: var(--foxy-breadcrumb---margin-block-start);
		margin-block-end: var(--foxy-breadcrumb---margin-block-end);
		margin-inline-start: var(--foxy-breadcrumb---margin-inline-start);
		margin-inline-end: var(--foxy-breadcrumb---margin-inline-end);

		&__items {
			display: flex;
			align-items: center;
			line-height: 1.6;
			list-style: none;
			margin-block: 0;
			padding-inline-start: 0;
		}

		&__item {
			display: flex;
		}

		&--elevated {
			--foxy-breadcrumb---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxy-breadcrumb---border-width: thin;
		}

		&--rounded {
			--foxy-breadcrumb---border-radius: 4px;
		}

		&--density-default {
			--foxy-breadcrumb---density: 0px;
		}

		&--density-compact {
			--foxy-breadcrumb---density: 8px;
		}
	}
</style>

<style>
	:root {
		--foxy-breadcrumb---border-top-width: 0;
		--foxy-breadcrumb---border-left-width: 0;
		--foxy-breadcrumb---border-bottom-width: 0;
		--foxy-breadcrumb---border-right-width: 0;
		--foxy-breadcrumb---border-width: var(--foxy-breadcrumb---border-top-width) var(--foxy-breadcrumb---border-left-width) var(--foxy-breadcrumb---border-bottom-width) var(--foxy-breadcrumb---border-right-width);
		--foxy-breadcrumb---border-color: currentColor;
		--foxy-breadcrumb---border-style: solid;
		--foxy-breadcrumb---border-radius: 0;
		--foxy-breadcrumb---density: 0;
		--foxy-breadcrumb---box-shadow: none;
		--foxy-breadcrumb---color: rgba(0, 0, 0, 0.87);
		--foxy-breadcrumb---background: rgb(230, 230, 230);
		--foxy-breadcrumb---margin-inline-start: 0;
		--foxy-breadcrumb---margin-inline-end: 0;
		--foxy-breadcrumb---margin-block-start: 0;
		--foxy-breadcrumb---margin-block-end: 0;
		--foxy-breadcrumb---padding-block-start: 8px;
		--foxy-breadcrumb---padding-block-end: 8px;
		--foxy-breadcrumb---padding-inline-start: 8px;
		--foxy-breadcrumb---padding-inline-end: 8px;
		--foxy-breadcrumb---transition-duration: 0.2s, 0.1s;
		--foxy-breadcrumb---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-breadcrumb---transition-property: transform, color;
		--foxy-breadcrumb---transition: var(--foxy-breadcrumb---transition-property) var(--foxy-breadcrumb---transition-duration) var(--foxy-breadcrumb---transition-timing-function);
	}
</style>
