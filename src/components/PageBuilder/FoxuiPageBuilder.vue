<template>
	<foxui-layout
			ref="pageBuilderRef"
			:class="pageBuilderClasses"
			:style="pageBuilderStyles"
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
	import { useProps } from "@foxui/composables"

	import type { ILayoutProps } from '@foxui/interfaces'

	import { computed, StyleValue } from 'vue'

	// TODO - WIP

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	// CLASSES & STYLES

	const pageBuilderStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const pageBuilderClasses = computed(() => {
		return ['foxui-page-builder', props.class]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})

</script>
