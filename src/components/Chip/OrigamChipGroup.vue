<template>
	<origam-slide-group
			ref="origamSlideGroupRef"
			:class="chipGroupClasses"
			:style="chipGroupStyles"
			v-bind="{...slideGroupProps}"
	>
		<slot
				name="default"
				v-bind="{isSelected, select, next, prev, selected}"
		/>
	</origam-slide-group>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSlideGroup } from '@/components'

	import { useGroup, useProps } from "@/composables"

	import { ORIGAM_CHIP_GROUP_KEY } from "@/consts"

	import { DIRECTION, MDI_ICONS } from '@/enums'

	import type { IChipGroupProps } from '@/interfaces'

	import type { TOrigamSlideGroup } from "@/types"

	import { computed, ref, StyleValue } from "vue";

	const props = withDefaults(defineProps<IChipGroupProps>(), {
		direction: DIRECTION.HORIZONTAL,
		nextIcon: MDI_ICONS.CHEVRON_RIGHT,
		prevIcon: MDI_ICONS.CHEVRON_LEFT,
		selectedClass: 'origam-chip--selected'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IChipGroupProps>(props)

	const origamSlideGroupRef = ref<TOrigamSlideGroup>()

	const {isSelected, select, next, prev, selected} = useGroup(props, ORIGAM_CHIP_GROUP_KEY)

	const slideGroupProps = computed(() => {
		return origamSlideGroupRef.value?.filterProps(props)
	})

	// CLASS & STYLES

	const chipGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const chipGroupClasses = computed(() => {
		return [
			'origam-chip-group',
			{
				'origam-chip-group--column': props.column
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
