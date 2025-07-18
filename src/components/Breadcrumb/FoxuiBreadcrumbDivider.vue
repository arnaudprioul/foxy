<template>
	<component
			:is="tag"
			:class="breadcrumbDividerClasses"
			:style="breadcrumbDividerStyles"
	>
		<slot name="default">
			<template v-if="isIcon">
				<foxui-icon :icon="divider"/>
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
	import { FoxuiIcon } from '@foxui/components'

	import { useBothColor, useDensity, useMargin, usePadding, useProps, useSize, useStyle } from '@foxui/composables'

	import { MDI_ICONS } from '@foxui/enums'

	import type { IBreadcrumbDividerProps } from '@foxui/interfaces'
	import type { TValueOf } from "@foxui/types"

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
			'foxui-breadcrumb-divider',
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
	.foxui-breadcrumbs-divider {
		display: inline-block;
		vertical-align: middle;

		transition: var(--foxui-breadcrumb-divider---transition);

		background: var(--foxui-breadcrumb-divider---background);
		box-shadow: var(--foxui-breadcrumb-divider---box-shadow);
		color: var(--foxui-breadcrumb-divider---color);
		opacity: var(--foxui-breadcrumb-divider---opacity);

		border-color: var(--foxui-breadcrumb-divider---border-color);
		border-style: var(--foxui-breadcrumb-divider---border-style);
		border-width: var(--foxui-breadcrumb-divider---border-width);
		border-radius: var(--foxui-breadcrumb-divider---border-radius);

		padding-block-start: calc(var(--foxui-breadcrumb-divider---padding-block-start) - var(--foxui-breadcrumb-divider---density));
		padding-block-end: calc(var(--foxui-breadcrumb-divider---padding-block-end) - var(--foxui-breadcrumb-divider---density));
		padding-inline-start: calc(var(--foxui-breadcrumb-divider---padding-inline-start) - var(--foxui-breadcrumb-divider---density));
		padding-inline-end: calc(var(--foxui-breadcrumb-divider---padding-inline-end) - var(--foxui-breadcrumb-divider---density));

		margin-block-start: var(--foxui-breadcrumb-divider---margin-block-start);
		margin-block-end: var(--foxui-breadcrumb-divider---margin-block-end);
		margin-inline-start: var(--foxui-breadcrumb-divider---margin-inline-start);
		margin-inline-end: var(--foxui-breadcrumb-divider---margin-inline-end);

		&--density-comfortable {
			--foxui-breadcrumb-divider---density: 8px;
		}

		&--density-default {
			--foxui-breadcrumb-divider---density: 0px;
		}

		&--density-compact {
			--foxui-breadcrumb-divider---density: 8px;
		}
	}
</style>

<style>
	:root {
		--foxui-breadcrumb-divider---border-top-width: 0;
		--foxui-breadcrumb-divider---border-left-width: 0;
		--foxui-breadcrumb-divider---border-bottom-width: 0;
		--foxui-breadcrumb-divider---border-right-width: 0;
		--foxui-breadcrumb-divider---border-width: var(--foxui-breadcrumb-divider---border-top-width) var(--foxui-breadcrumb-divider---border-left-width) var(--foxui-breadcrumb-divider---border-bottom-width) var(--foxui-breadcrumb-divider---border-right-width);
		--foxui-breadcrumb-divider---border-color: currentColor;
		--foxui-breadcrumb-divider---border-style: solid;
		--foxui-breadcrumb-divider---border-radius: 0;
		--foxui-breadcrumb-divider---density: 0;
		--foxui-breadcrumb-divider---box-shadow: none;
		--foxui-breadcrumb-divider---color: inherit;
		--foxui-breadcrumb-divider---opacity: 1;
		--foxui-breadcrumb-divider---background: transparent;
		--foxui-breadcrumb-divider---margin-inline-start: 0;
		--foxui-breadcrumb-divider---margin-inline-end: 0;
		--foxui-breadcrumb-divider---margin-block-start: 0;
		--foxui-breadcrumb-divider---margin-block-end: 0;
		--foxui-breadcrumb-divider---padding-block-start: 0;
		--foxui-breadcrumb-divider---padding-block-end: 0;
		--foxui-breadcrumb-divider---padding-inline-start: 8px;
		--foxui-breadcrumb-divider---padding-inline-end: 8px;
		--foxui-breadcrumb-divider---transition-duration: 0.2s, 0.1s;
		--foxui-breadcrumb-divider---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-breadcrumb-divider---transition-property: transform, color;
		--foxui-breadcrumb-divider---transition: var(--foxui-breadcrumb-divider---transition-property) var(--foxui-breadcrumb-divider---transition-duration) var(--foxui-breadcrumb-divider---transition-timing-function);
	}
</style>
