<template>
	<foxui-layout
			:id="id"
			ref="foxuiAppRef"
			:class="appClasses"
			:style="appStyles"
	>
		<template #default>
			<slot name="default"/>
		</template>
	</foxui-layout>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiLayout } from '@foxui/components'

	import { useProps, useRtl } from "@foxui/composables"

	import type { ILayoutProps } from '@foxui/interfaces'

	import type { TFoxuiApp } from "@foxui/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	const {rtlClasses} = useRtl()

	const foxuiAppRef = ref<TFoxuiApp>()

	// CLASSES & STYLES

	const appStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const appClasses = computed(() => {
		return [
			'foxui-app',
			rtlClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
