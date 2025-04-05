<template>
	<foxy-menu
			ref="foxyMenuRef"
			:class="contextualMenuClasses"
			:style="contextualMenuStyles"
			v-model:model-value="modelValue"
			:open-on-click="false"
			activator="cursor"
			open-on-context-menu
			target="cursor"
			v-bind="menuProps"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyMenu, FoxyTranslateScale } from "@foxy/components"
	import { useProps, useVModel } from "@foxy/composables"
	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from "@foxy/enums"
	import { IContextualMenuProps } from "@foxy/interfaces"
	import { TFoxyMenu, TTransitionProps } from "@foxy/types"
	import { forwardRefs } from "@foxy/utils"

	import { computed, ref, StyleValue } from "vue"

	const props = withDefaults(defineProps<IContextualMenuProps>(), {
		target: 'cursor',
		openOnClick: false,
		openOnContextMenu: true,
		activator: 'cursor',
		closeDelay: 250,
		closeOnContentClick: true,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		openDelay: 300,
		scrim: false,
		location: INLINE.RIGHT,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		offset: 8,
		transition: () => ({component: FoxyTranslateScale}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IContextualMenuProps>(props)

	const modelValue = useVModel(props, 'modelValue', false)

	const foxyMenuRef = ref<TFoxyMenu>()
	const menuProps = computed(() => {
		return foxyMenuRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue', 'activator', 'target', 'openOnClick', 'openOnContextualMenu'])
	})

	// CLASS & STYLES

	const contextualMenuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const contextualMenuClasses = computed(() => {
		return [
			'foxy-contextual-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxyMenuRef))

</script>

<style
		lang="scss"
		scoped
>

</style>
