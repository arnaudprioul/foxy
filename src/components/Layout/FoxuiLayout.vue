<template>
	<div
			:id="layoutId"
			ref="foxuiLayoutRef"
			:class="layClasses"
			:style="layStyles"
	>
		<div
				:id="`${layoutId}-wrapper`"
				class="foxui-layout__wrapper"
		>
			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { useCreateLayout, useProps } from '@foxui/composables'

	import type { ILayoutProps } from '@foxui/interfaces'
	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILayoutProps>(), {})

	const {filterProps} = useProps<ILayoutProps>(props)

	const {layoutClasses, layoutRef: foxuiLayoutRef, getLayoutItem, items, layoutId} = useCreateLayout(props)

	const layStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const layClasses = computed(() => {
		return [layoutClasses.value, props.class]
	})

	defineExpose({
		getLayoutItem,
		items,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-layout {
		&__wrapper {
			width: 100vw;
			height: 100vh;
			max-height: 100%;
			max-width: 100%;
		}
	}
</style>

<style>
	:root {

	}

	* {
		box-sizing: border-box;
	}
</style>
