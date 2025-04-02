<template>
	<foxy-overlay
			:id="id"
			ref="foxyOverlayRef"
			v-model="isActive"
			:activator-props="activatorProps"
			:class="tooltipClasses"
			:location="location"
			:origin="origin"
			:style="tooltipStyles"
			:transition="transition"
			absolute
			disable-global-stack
			persistent
			role="tooltip"
			v-bind="{...overlayProps, ...scopeId}"
	>
		<template #activator="{props}">
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default>
			<slot name="default">
				<span>{{ text }}</span>
			</slot>
		</template>
	</foxy-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyFade, FoxyOverlay, FoxyTranslateScale } from '@foxy/components'

	import { useProps, useScopeId, useVModel } from '@foxy/composables'

	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from '@foxy/enums'

	import { ITooltipProps } from '@foxy/interfaces'

	import { TAnchor, TFoxyOverlay } from '@foxy/types'

	import { forwardRefs, getUid } from '@foxy/utils'

	import { computed, mergeProps, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ITooltipProps>(), {
		closeOnBack: false,
		location: INLINE.RIGHT,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		eager: true,
		minWidth: 0,
		offset: 10,
		openOnClick: false,
		openOnHover: true,
		origin: 'auto',
		scrim: false,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		transition: false
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ITooltipProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()

	const uid = getUid()
	const id = computed(() => props.id || `foxy-tooltip-${uid}`)

	const foxyOverlayRef = ref<TFoxyOverlay>()

	const location = computed(() => {
		return props.location.split(' ').length > 1
				? props.location
				: props.location + ' center' as TAnchor
	})

	const origin = computed(() => {
		return (
				props.origin === 'auto' ||
				props.origin === 'overlap' ||
				props.origin.split(' ').length > 1 ||
				props.location.split(' ').length > 1
		) ? props.origin
				: props.origin + ' center' as TAnchor | 'auto' | 'overlap'
	})

	const transition = computed(() => {
		if (props.transition) return props.transition
		return {component: isActive.value ? FoxyTranslateScale : FoxyFade}
	})

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-describedby': id.value
		}, props.activatorProps)
	})

	const overlayProps = computed(() => {
		return foxyOverlayRef.value?.filterProps(props, ['activatorProps', 'class', 'style', 'modelValue', 'location', 'origin', 'transition', 'disableGlobalStack', 'absolute', 'persistent', 'id'])
	})

	// CLASS & STYLES

	const tooltipStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const tooltipClasses = computed(() => {
		return [
			'foxy-tooltip',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxyOverlayRef))
</script>

<style
		lang="scss"
		scoped
>

</style>

<style>
	:root {

	}
</style>
