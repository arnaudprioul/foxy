<template>
	<component
			:is="tag"
			:class="loaderClasses"
			:style="loaderStyles"
	>
		<template v-if="isLoading">
			<slot name="loader">
				<foxui-progress
						:color="color"
						:size="23"
						:type="PROGRESS_TYPE.CIRCULAR"
						:width="2"
						indeterminate
				/>
			</slot>
		</template>
		<template v-else>
			<slot name="default"/>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiProgress } from '@foxui/components'
	import { useProps } from "@foxui/composables"

	import { PROGRESS_TYPE } from '@foxui/enums'

	import type { ILoaderProps } from '@foxui/interfaces'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILoaderProps>(), {tag: 'span'})

	const {filterProps} = useProps<ILoaderProps>(props)

	const isLoading = computed(() => {
		return !!props.loading
	})

	// CLASS & STYLES

	const loaderStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const loaderClasses = computed(() => {
		return [
			'foxui-loader',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
