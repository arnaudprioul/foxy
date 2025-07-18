<template>
	<foxui-menu
			ref="foxuiMenuRef"
			v-model:model-value="modelValue"
			:class="contextualMenuClasses"
			:open-on-click="false"
			:style="contextualMenuStyles"
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
	import { FoxuiMenu, FoxuiTranslateScale } from "@foxui/components"
	import { useProps, useVModel } from "@foxui/composables"
	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from "@foxui/enums"
	import type { IContextualMenuProps } from "@foxui/interfaces"
	import type { TFoxuiMenu, TTransitionProps } from "@foxui/types"
	import { forwardRefs } from "@foxui/utils"

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
		transition: () => ({component: FoxuiTranslateScale}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IContextualMenuProps>(props)

	const modelValue = useVModel(props, 'modelValue', false)

	const foxuiMenuRef = ref<TFoxuiMenu>()
	const menuProps = computed(() => {
		return foxuiMenuRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue', 'activator', 'target', 'openOnClick', 'openOnContextualMenu'])
	})

	// CLASS & STYLES

	const contextualMenuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const contextualMenuClasses = computed(() => {
		return [
			'foxui-contextual-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxuiMenuRef))

</script>

<style
		lang="scss"
		scoped
>

</style>
