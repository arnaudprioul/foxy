<template>
	<component
			:is="tag"
			:class="breadcrumbClasses"
			:style="breadcrumbStyles"
	>
		<slot name="default">
			<template v-if="hasItems">
				<ul class="foxy-breadcrumb__items">
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
										<slot name="title"/>
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
				</ul>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBreadcrumbDivider, FoxyBreadcrumbItem } from '@foxy/components'

	import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps, useRounded } from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import type { IBreadcrumbItemProps, IBreadcrumbProps } from '@foxy/interfaces'

	import type { TBreadcrumbItem } from '@foxy/types'

	import { computed, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbProps>(), {
		divider: '/',
		items: () => [] as Array<TBreadcrumbItem>,
		tag: 'div',
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<IBreadcrumbProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const items = computed(() => {
		return props.items.map((item, index) => {
			return typeof item === 'string' ? {title: item, disabled: isLastItem(index)} : {
				...item,
				density: props.density ?? item.density,
				disabled: isLastItem(index) || item.disabled
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
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
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
	.foxy-breadcrumb {
		padding: 16px;

		&--rounded {
			border-radius: 4px;
		}

		&--density-default {
			padding: 16px;
		}

		&--density-compact {
			padding: 8px;
		}

		&__items {
			display: flex;
			align-items: center;
			line-height: 1.6;
			list-style: none;
		}

		&__item {
			display: flex;
		}
	}
</style>

<style>
	:root {

	}
</style>
