<template>
	<component
			:is="tag"
			:id="id"
			:class="breadcrumbClasses"
			aria-label="Breadcrumb"
	>
		<slot name="default">
			<template v-if="hasItems">
				<ol class="origam-breadcrumb__items">
					<template
							v-for="(item, index) in items"
							:key="index"
					>
						<li class="origam-breadcrumb__item">
							<slot
									:name="`item.${index}`"
									v-bind="{item, index}"
							>
								<slot
										name="item"
										v-bind="{ item, index }"
								>
									<origam-breadcrumb-item v-bind="item">
										<slot name="item.title"/>
									</origam-breadcrumb-item>
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
										<origam-breadcrumb-divider :divider="divider"/>
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
	import { OrigamBreadcrumbDivider, OrigamBreadcrumbItem } from '@origam/components'

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
	} from '@origam/composables'

	import { DENSITY } from '@origam/enums'

	import type { IBreadcrumbItemProps, IBreadcrumbProps } from '@origam/interfaces'

	import type { TBreadcrumbItem } from '@origam/types'

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
			'origam-breadcrumb',
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
	.origam-breadcrumb {
		transition: var(--origam-breadcrumb---transition);

		background: var(--origam-breadcrumb---background);
		box-shadow: var(--origam-breadcrumb---box-shadow);
		color: var(--origam-breadcrumb---color);

		border-color: var(--origam-breadcrumb---border-color);
		border-style: var(--origam-breadcrumb---border-style);
		border-width: var(--origam-breadcrumb---border-width);
		border-radius: var(--origam-breadcrumb---border-radius);

		padding-block-start: calc(var(--origam-breadcrumb---padding-block-start) - var(--origam-breadcrumb---density));
		padding-block-end: calc(var(--origam-breadcrumb---padding-block-end) - var(--origam-breadcrumb---density));
		padding-inline-start: calc(var(--origam-breadcrumb---padding-inline-start) - var(--origam-breadcrumb---density));
		padding-inline-end: calc(var(--origam-breadcrumb---padding-inline-end) - var(--origam-breadcrumb---density));

		margin-block-start: var(--origam-breadcrumb---margin-block-start);
		margin-block-end: var(--origam-breadcrumb---margin-block-end);
		margin-inline-start: var(--origam-breadcrumb---margin-inline-start);
		margin-inline-end: var(--origam-breadcrumb---margin-inline-end);

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
			align-items: center;
		}

		&--elevated {
			--origam-breadcrumb---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--origam-breadcrumb---border-width: thin;
		}

		&--rounded {
			--origam-breadcrumb---border-radius: 4px;
		}

		&--density-comfortable {
			--origam-breadcrumb---density: 8px;
		}

		&--density-default {
			--origam-breadcrumb---density: 0px;
		}

		&--density-compact {
			--origam-breadcrumb---density: 8px;
		}
	}
</style>

<style>
	:root {
		--origam-breadcrumb---border-top-width: 0;
		--origam-breadcrumb---border-left-width: 0;
		--origam-breadcrumb---border-bottom-width: 0;
		--origam-breadcrumb---border-right-width: 0;
		--origam-breadcrumb---border-width: var(--origam-breadcrumb---border-top-width) var(--origam-breadcrumb---border-left-width) var(--origam-breadcrumb---border-bottom-width) var(--origam-breadcrumb---border-right-width);
		--origam-breadcrumb---border-color: currentColor;
		--origam-breadcrumb---border-style: solid;
		--origam-breadcrumb---border-radius: 0;
		--origam-breadcrumb---density: 0;
		--origam-breadcrumb---box-shadow: none;
		--origam-breadcrumb---color: rgba(0, 0, 0, 0.87);
		--origam-breadcrumb---background: rgb(230, 230, 230);
		--origam-breadcrumb---margin-inline-start: 0;
		--origam-breadcrumb---margin-inline-end: 0;
		--origam-breadcrumb---margin-block-start: 0;
		--origam-breadcrumb---margin-block-end: 0;
		--origam-breadcrumb---padding-block-start: 8px;
		--origam-breadcrumb---padding-block-end: 8px;
		--origam-breadcrumb---padding-inline-start: 8px;
		--origam-breadcrumb---padding-inline-end: 8px;
		--origam-breadcrumb---transition-duration: 0.2s, 0.1s;
		--origam-breadcrumb---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-breadcrumb---transition-property: transform, color;
		--origam-breadcrumb---transition: var(--origam-breadcrumb---transition-property) var(--origam-breadcrumb---transition-duration) var(--origam-breadcrumb---transition-timing-function);
	}
</style>
