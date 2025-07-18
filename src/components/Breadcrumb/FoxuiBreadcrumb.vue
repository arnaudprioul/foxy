<template>
	<component
			:is="tag"
			:id="id"
			:class="breadcrumbClasses"
			aria-label="Breadcrumb"
	>
		<slot name="default">
			<template v-if="hasItems">
				<ol class="foxui-breadcrumb__items">
					<template
							v-for="(item, index) in items"
							:key="index"
					>
						<li class="foxui-breadcrumb__item">
							<slot
									:name="`item.${index}`"
									v-bind="{item, index}"
							>
								<slot
										name="item"
										v-bind="{ item, index }"
								>
									<foxui-breadcrumb-item v-bind="item">
										<slot name="item.title"/>
									</foxui-breadcrumb-item>
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
										<foxui-breadcrumb-divider :divider="divider"/>
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
	import { FoxuiBreadcrumbDivider, FoxuiBreadcrumbItem } from '@foxui/components'

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

	import type { IBreadcrumbItemProps, IBreadcrumbProps } from '@foxui/interfaces'

	import type { TBreadcrumbItem } from '@foxui/types'

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
			'foxui-breadcrumb',
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
	.foxui-breadcrumb {
		transition: var(--foxui-breadcrumb---transition);

		background: var(--foxui-breadcrumb---background);
		box-shadow: var(--foxui-breadcrumb---box-shadow);
		color: var(--foxui-breadcrumb---color);

		border-color: var(--foxui-breadcrumb---border-color);
		border-style: var(--foxui-breadcrumb---border-style);
		border-width: var(--foxui-breadcrumb---border-width);
		border-radius: var(--foxui-breadcrumb---border-radius);

		padding-block-start: calc(var(--foxui-breadcrumb---padding-block-start) - var(--foxui-breadcrumb---density));
		padding-block-end: calc(var(--foxui-breadcrumb---padding-block-end) - var(--foxui-breadcrumb---density));
		padding-inline-start: calc(var(--foxui-breadcrumb---padding-inline-start) - var(--foxui-breadcrumb---density));
		padding-inline-end: calc(var(--foxui-breadcrumb---padding-inline-end) - var(--foxui-breadcrumb---density));

		margin-block-start: var(--foxui-breadcrumb---margin-block-start);
		margin-block-end: var(--foxui-breadcrumb---margin-block-end);
		margin-inline-start: var(--foxui-breadcrumb---margin-inline-start);
		margin-inline-end: var(--foxui-breadcrumb---margin-inline-end);

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
			--foxui-breadcrumb---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxui-breadcrumb---border-width: thin;
		}

		&--rounded {
			--foxui-breadcrumb---border-radius: 4px;
		}

		&--density-comfortable {
			--foxui-breadcrumb---density: 8px;
		}

		&--density-default {
			--foxui-breadcrumb---density: 0px;
		}

		&--density-compact {
			--foxui-breadcrumb---density: 8px;
		}
	}
</style>

<style>
	:root {
		--foxui-breadcrumb---border-top-width: 0;
		--foxui-breadcrumb---border-left-width: 0;
		--foxui-breadcrumb---border-bottom-width: 0;
		--foxui-breadcrumb---border-right-width: 0;
		--foxui-breadcrumb---border-width: var(--foxui-breadcrumb---border-top-width) var(--foxui-breadcrumb---border-left-width) var(--foxui-breadcrumb---border-bottom-width) var(--foxui-breadcrumb---border-right-width);
		--foxui-breadcrumb---border-color: currentColor;
		--foxui-breadcrumb---border-style: solid;
		--foxui-breadcrumb---border-radius: 0;
		--foxui-breadcrumb---density: 0;
		--foxui-breadcrumb---box-shadow: none;
		--foxui-breadcrumb---color: rgba(0, 0, 0, 0.87);
		--foxui-breadcrumb---background: rgb(230, 230, 230);
		--foxui-breadcrumb---margin-inline-start: 0;
		--foxui-breadcrumb---margin-inline-end: 0;
		--foxui-breadcrumb---margin-block-start: 0;
		--foxui-breadcrumb---margin-block-end: 0;
		--foxui-breadcrumb---padding-block-start: 8px;
		--foxui-breadcrumb---padding-block-end: 8px;
		--foxui-breadcrumb---padding-inline-start: 8px;
		--foxui-breadcrumb---padding-inline-end: 8px;
		--foxui-breadcrumb---transition-duration: 0.2s, 0.1s;
		--foxui-breadcrumb---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-breadcrumb---transition-property: transform, color;
		--foxui-breadcrumb---transition: var(--foxui-breadcrumb---transition-property) var(--foxui-breadcrumb---transition-duration) var(--foxui-breadcrumb---transition-timing-function);
	}
</style>
