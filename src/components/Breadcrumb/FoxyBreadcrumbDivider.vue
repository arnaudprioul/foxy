<template>
	<component
			:is="tag"
			:class="breadcrumbDividerClasses"
			:style="breadcrumbDividerStyles"
	>
		<slot name="default">
			<template v-if="isIcon">
				<foxy-icon :icon="divider"/>
			</template>
			<template v-else>
				{{ divider }}
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyIcon } from '@foxy/components'

	import { useBothColor, useDensity, useMargin, usePadding, useProps, useSize, useStyle } from '@foxy/composables'

	import { MDI_ICONS } from '@foxy/enums'

	import type { IBreadcrumbDividerProps } from '@foxy/interfaces'
	import type { TValueOf } from "@foxy/types"

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbDividerProps>(), {tag: 'span', divider: '/'})

	const {filterProps} = useProps<IBreadcrumbDividerProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {sizeStyles, sizeClasses} = useSize(props)

	const isIcon = computed(() => {
		return typeof props.divider !== 'string' || Object.values(MDI_ICONS).includes(props.divider as TValueOf<typeof MDI_ICONS>)
	})

	// CLASS & STYLES

	const breadcrumbDividerStyles = computed(() => {
		return [
			colorStyles.value,
			paddingStyles.value,
			marginStyles.value,
			sizeStyles.value,
			props.style
		] as StyleValue
	})
	const breadcrumbDividerClasses = computed(() => {
		return [
			'foxy-breadcrumb-divider',
			densityClasses.value,
			sizeClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(breadcrumbDividerStyles)

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
	.foxy-breadcrumbs-divider {
		display: inline-block;
		vertical-align: middle;

		transition: var(--foxy-breadcrumb-divider---transition);

		background: var(--foxy-breadcrumb-divider---background);
		box-shadow: var(--foxy-breadcrumb-divider---box-shadow);
		color: var(--foxy-breadcrumb-divider---color);
		opacity: var(--foxy-breadcrumb-divider---opacity);

		border-color: var(--foxy-breadcrumb-divider---border-color);
		border-style: var(--foxy-breadcrumb-divider---border-style);
		border-width: var(--foxy-breadcrumb-divider---border-width);
		border-radius: var(--foxy-breadcrumb-divider---border-radius);

		padding-block-start: calc(var(--foxy-breadcrumb-divider---padding-block-start) - var(--foxy-breadcrumb-divider---density));
		padding-block-end: calc(var(--foxy-breadcrumb-divider---padding-block-end) - var(--foxy-breadcrumb-divider---density));
		padding-inline-start: calc(var(--foxy-breadcrumb-divider---padding-inline-start) - var(--foxy-breadcrumb-divider---density));
		padding-inline-end: calc(var(--foxy-breadcrumb-divider---padding-inline-end) - var(--foxy-breadcrumb-divider---density));

		margin-block-start: var(--foxy-breadcrumb-divider---margin-block-start);
		margin-block-end: var(--foxy-breadcrumb-divider---margin-block-end);
		margin-inline-start: var(--foxy-breadcrumb-divider---margin-inline-start);
		margin-inline-end: var(--foxy-breadcrumb-divider---margin-inline-end);

		&--density-default {
			--foxy-breadcrumb-divider---density: 0px;
		}

		&--density-compact {
			--foxy-breadcrumb-divider---density: 8px;
		}
	}
</style>

<style>
	:root {
		--foxy-breadcrumb-divider---border-top-width: 0;
		--foxy-breadcrumb-divider---border-left-width: 0;
		--foxy-breadcrumb-divider---border-bottom-width: 0;
		--foxy-breadcrumb-divider---border-right-width: 0;
		--foxy-breadcrumb-divider---border-width: var(--foxy-breadcrumb-divider---border-top-width) var(--foxy-breadcrumb-divider---border-left-width) var(--foxy-breadcrumb-divider---border-bottom-width) var(--foxy-breadcrumb-divider---border-right-width);
		--foxy-breadcrumb-divider---border-color: currentColor;
		--foxy-breadcrumb-divider---border-style: solid;
		--foxy-breadcrumb-divider---border-radius: 0;
		--foxy-breadcrumb-divider---density: 0;
		--foxy-breadcrumb-divider---box-shadow: none;
		--foxy-breadcrumb-divider---color: inherit;
		--foxy-breadcrumb-divider---opacity: 1;
		--foxy-breadcrumb-divider---background: transparent;
		--foxy-breadcrumb-divider---margin-inline-start: 0;
		--foxy-breadcrumb-divider---margin-inline-end: 0;
		--foxy-breadcrumb-divider---margin-block-start: 0;
		--foxy-breadcrumb-divider---margin-block-end: 0;
		--foxy-breadcrumb-divider---padding-block-start: 0;
		--foxy-breadcrumb-divider---padding-block-end: 0;
		--foxy-breadcrumb-divider---padding-inline-start: 8px;
		--foxy-breadcrumb-divider---padding-inline-end: 8px;
		--foxy-breadcrumb-divider---transition-duration: 0.2s, 0.1s;
		--foxy-breadcrumb-divider---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-breadcrumb-divider---transition-property: transform, color;
		--foxy-breadcrumb-divider---transition: var(--foxy-breadcrumb-divider---transition-property) var(--foxy-breadcrumb-divider---transition-duration) var(--foxy-breadcrumb-divider---transition-timing-function);
	}
</style>
