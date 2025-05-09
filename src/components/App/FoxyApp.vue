<template>
	<foxy-layout
			:id="id"
			ref="foxyAppRef"
			:class="appClasses"
			:style="appStyles"
	>
		<template #default>
			<slot name="default"/>
		</template>
	</foxy-layout>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyLayout } from '@foxy/components'

	import { useProps, useRtl } from "@foxy/composables"

	import type { ILayoutProps } from '@foxy/interfaces'

	import type { TFoxyApp } from "@foxy/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	const {rtlClasses} = useRtl()

	const foxyAppRef = ref<TFoxyApp>()

	// CLASSES & STYLES

	const appStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const appClasses = computed(() => {
		return [
			'foxy-app',
			rtlClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
