<template>
	<origam-menu
			ref="origamMenuRef"
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
	import { OrigamMenu, OrigamTranslateScale } from "@origam/components"
	import { useProps, useVModel } from "@origam/composables"
	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from "@origam/enums"
	import type { IContextualMenuProps } from "@origam/interfaces"
	import type { TOrigamMenu, TTransitionProps } from "@origam/types"
	import { forwardRefs } from "@origam/utils"

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
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IContextualMenuProps>(props)

	const modelValue = useVModel(props, 'modelValue', false)

	const origamMenuRef = ref<TOrigamMenu>()
	const menuProps = computed(() => {
		return origamMenuRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue', 'activator', 'target', 'openOnClick', 'openOnContextualMenu'])
	})

	// CLASS & STYLES

	const contextualMenuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const contextualMenuClasses = computed(() => {
		return [
			'origam-contextual-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, origamMenuRef))

</script>

<style
		lang="scss"
		scoped
>

</style>
