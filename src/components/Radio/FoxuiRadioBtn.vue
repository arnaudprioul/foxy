<template>
	<foxui-selection-control
			ref="foxuiSelectionControlRef"
			v-model="model"
			:class="radioBtnClasses"
			:false-icon="falseIcon"
			:style="radioBtnStyles"
			:true-icon="trueIcon"
			type="radio"
			v-bind="controlProps"
			@click:label="handleClickLabel"
	>
		<template
				v-if="slots.default"
				#default
		>
			<slot name="default"/>
		</template>

		<template
				v-if="slots.input"
				#input="{props, icon, textColorStyles, backgroundColorStyles, model}"
		>
			<slot
					name="input"
					v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"
			/>
		</template>

		<template
				v-if="slots.label"
				#label
		>
			<slot name="label"/>
		</template>
	</foxui-selection-control>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiSelectionControl } from '@foxui/components'

	import { useProps, useVModel } from '@foxui/composables'

	import { DENSITY, MDI_ICONS } from '@foxui/enums'

	import type { IRadioBtnProps } from '@foxui/interfaces'

	import type { TFoxuiSelectionControl } from "@foxui/types"

	import { computed, ref, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IRadioBtnProps>(), {
		density: DENSITY.DEFAULT,
		trueIcon: MDI_ICONS.RADIOBOX_MARKED,
		falseIcon: MDI_ICONS.RADIOBOX_BLANK
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<IRadioBtnProps>(props)

	const foxuiSelectionControlRef = ref<TFoxuiSelectionControl>()

	const model = useVModel(props, 'modelValue')

	const slots = useSlots()

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const controlProps = computed(() => {
		return foxuiSelectionControlRef.value?.filterProps(props, ['class', 'style', 'id', 'modelValue', 'falseIcon', 'trueIcon', 'type'])
	})

	// CLASS & STYLES

	const radioBtnStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const radioBtnClasses = computed(() => {
		return [
			'foxui-radio-btn',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
