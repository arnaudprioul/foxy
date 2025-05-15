<template>
	<foxy-toolbar
			ref="foxyToolbarRef"
			:class="appBarClasses"
			:collapse="isCollapsed"
			:flat="isFlat"
			:style="appBarStyles"
			v-bind="toolbarProps"
	>
		<template
				v-if="hasAppend"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="hasPrepend"
				#prepend
		>
			<div
					v-if="hasImage"
					class="foxy-bar__img"
			>
				<slot name="img">
					<foxy-img v-bind="image"/>
				</slot>
			</div>
			<slot name="prepend"/>
		</template>

		<template
				v-if="hasContent"
				#content
		>
			<slot name="content"/>
		</template>

		<template
				v-if="slots.default"
				#default
		>
			<slot name="default"/>
		</template>
	</foxy-toolbar>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyImg, FoxyToolbar } from '@foxy/components'

	import { useLayoutItem, useProps, useScroll, useSsrBoot, useToggleScope, useVModel } from '@foxy/composables'

	import { BLOCK, DENSITY } from '@foxy/enums'

	import type { IAppBarProps } from '@foxy/interfaces'

	import type { TFoxyToolbar } from "@foxy/types"

	import { forwardRefs, int } from "@foxy/utils"

	import { computed, ref, shallowRef, StyleValue, toRef, useSlots, watchEffect } from 'vue'

	const props = withDefaults(defineProps<IAppBarProps>(), {
		tag: 'header',
		density: DENSITY.DEFAULT,
		scrollThreshold: 300,
		location: BLOCK.TOP,
		modelValue: true
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IAppBarProps>(props)

	const {ssrBootStyles} = useSsrBoot()
	const slots = useSlots()

	const foxyToolbarRef = ref<TFoxyToolbar>()

	const toolbarProps = computed(() => {
		return foxyToolbarRef.value?.filterProps(props, ['class', 'style', 'collapse', 'flat'])
	})

	const hasImage = computed(() => {
		return !!(props.image || slots.img)
	})
	const hasPrepend = computed(() => {
		return hasImage.value || slots.prepend
	})
	const hasContent = computed(() => {
		return slots.content
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	const isActive = useVModel(props, 'modelValue')

	// SCROLL
	const scrollBehavior = computed(() => {
		const behavior = new Set(props.scrollBehavior?.split(' ') ?? [])

		return {
			hide: behavior.has('hide'),
			// fullyHide: behavior.has('fully-hide'),
			inverted: behavior.has('inverted'),
			collapse: behavior.has('collapse'),
			elevate: behavior.has('elevate'),
			fadeImage: behavior.has('fade-image')
			// shrink: behavior.has('shrink'),
		}
	})
	const canScroll = computed(() => {
		const behavior = scrollBehavior.value

		return (
				behavior.hide ||
				behavior.inverted ||
				behavior.collapse ||
				behavior.elevate ||
				behavior.fadeImage ||
				!isActive.value
		)
	})

	const {
		currentScroll,
		scrollThreshold,
		isScrollingUp,
		scrollRatio
	} = useScroll(props, {canScroll})
	useToggleScope(computed(() => !!props.scrollBehavior), () => {
		watchEffect(() => {
			if (scrollBehavior.value.hide) {
				if (scrollBehavior.value.inverted) {
					isActive.value = currentScroll.value > scrollThreshold.value
				} else {
					isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value)
				}
			} else {
				isActive.value = true
			}
		})
	})

	const isCollapsed = computed(() => props.collapse || (
			scrollBehavior.value.collapse &&
			(scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
	))
	const isFlat = computed(() => props.flat || (
			scrollBehavior.value.elevate &&
			(scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
	))
	const height = computed(() => {
		if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0

		return props.height ?? 0
	})

	// LAYOUT

	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order as string)),
		position: toRef(props, 'location'),
		layoutSize: height,
		elementSize: shallowRef(undefined),
		active: isActive,
		absolute: toRef(props, 'absolute')
	})

	// CLASS & STYLES

	const appBarStyles = computed(() => {
		return [
			layoutItemStyles.value,
			ssrBootStyles.value,
			props.style
		] as StyleValue
	})
	const appBarClasses = computed(() => {
		return [
			'foxy-app-bar',
			`foxy-app-bar--${props.location}`,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({
		filterProps
	}, foxyToolbarRef))

</script>
