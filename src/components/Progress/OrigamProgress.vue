<template>
	<component
			:is="progressComponent"
			ref="origamProgressRef"
			:aria-hidden="!props.active"
			:aria-valuemax="max"
			:aria-valuenow="indeterminate ? undefined : normalizedValue"
			:class="progressClasses"
			:style="progressStyles"
			aria-valuemin="0"
			role="progressbar"
			v-bind="progressProps"
	>
		<template
				v-if="hasContent"
				#default
		>
			<slot name="default"/>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue } from 'vue'
	import { OrigamProgressCircular, OrigamProgressLinear } from '../../components'

	import { useProgress, useProps, useSize } from '../../composables'

	import { PROGRESS_TYPE, SIZES } from '../../enums'

	import type { IProgressProps } from '../../interfaces'

	import type { TOrigamProgressCircular, TOrigamProgressLinear } from "../../types"

	const props = withDefaults(defineProps<IProgressProps>(), {
		tag: 'div',
		modelValue: 0,
		max: 100,
		thickness: 4,
		size: SIZES.DEFAULT
	})

	const {filterProps} = useProps<IProgressProps>(props)

	const origamProgressRef = ref<TOrigamProgressCircular | TOrigamProgressLinear>()

	const {sizeClasses, sizeStyles} = useSize(props)
	const {normalizedValue, hasContent} = useProgress(props)

	const isCircular = computed(() => {
		return props.type === PROGRESS_TYPE.CIRCULAR
	})
	const progressComponent = computed(() => {
		return isCircular.value ? OrigamProgressCircular : OrigamProgressLinear
	})
	const progressProps = computed(() => {
		return origamProgressRef.value?.filterProps(props)
	})

	// CLASS & STYLES

	const progressStyles = computed(() => {
		return [
			sizeStyles.value,
			props.style
		] as StyleValue
	})
	const progressClasses = computed(() => {
		return [
			sizeClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
