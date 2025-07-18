<template>
	<foxui-slide-group
			ref="foxuiSlideGroupRef"
			:class="chipGroupClasses"
			:style="chipGroupStyles"
			v-bind="{...slideGroupProps}"
	>
		<slot
				name="default"
				v-bind="{isSelected, select, next, prev, selected}"
		/>
	</foxui-slide-group>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiSlideGroup } from '@foxui/components'

	import { useGroup, useProps } from "@foxui/composables"

	import { FOXUI_CHIP_GROUP_KEY } from "@foxui/consts"

	import { DIRECTION, MDI_ICONS } from '@foxui/enums'

	import type { IChipGroupProps } from '@foxui/interfaces'

	import type { TFoxuiSlideGroup } from "@foxui/types"

	import { computed, ref, StyleValue } from "vue";

	const props = withDefaults(defineProps<IChipGroupProps>(), {
		direction: DIRECTION.HORIZONTAL,
		nextIcon: MDI_ICONS.CHEVRON_RIGHT,
		prevIcon: MDI_ICONS.CHEVRON_LEFT,
		selectedClass: 'foxui-chip--selected'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IChipGroupProps>(props)

	const foxuiSlideGroupRef = ref<TFoxuiSlideGroup>()

	const {isSelected, select, next, prev, selected} = useGroup(props, FOXUI_CHIP_GROUP_KEY)

	const slideGroupProps = computed(() => {
		return foxuiSlideGroupRef.value?.filterProps(props)
	})

	// CLASS & STYLES

	const chipGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const chipGroupClasses = computed(() => {
		return [
			'foxui-chip-group',
			{
				'foxui-chip-group--column': props.column
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
