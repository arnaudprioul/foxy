<template>
	<foxy-selection-control
			ref="foxySelectionControlRef"
			v-model="model"
			:aria-checked="indeterminate ? 'mixed' : undefined"
			:class="checkboxBtnClasses"
			:false-icon="falseIcon"
			:style="checkboxBtnStyles"
			:true-icon="trueIcon"
			type="checkbox"
			v-bind="controlProps"
			@update:model-value="handleChange"
			@click:label="handleClickLabel"
	>
		<template v-if="hasSlot('default')" #default>
			<slot name="default"/>
		</template>

		<template v-if="hasSlot('input')" #input="{props, icon, textColorStyles, backgroundColorStyles, model}">
			<slot name="input" v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"/>
		</template>

		<template v-if="hasSlot('label')" #label>
			<slot name="label"/>
		</template>
	</foxy-selection-control>
</template>

<script lang="ts" setup>
	import { FoxySelectionControl } from '@foxy/components'

	import { useProps, useSlots, useVModel } from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import { ICheckboxBtnProps } from '@foxy/interfaces'
	import { TFoxySelectionControl } from "@foxy/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ICheckboxBtnProps>(), {
		density: DENSITY.DEFAULT,
		falseIcon: '$checkboxOff',
		trueIcon: '$checkboxOn',
		indeterminateIcon: '$checkboxIndeterminate'
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'update:indeterminate', 'click:label'])

	const {filterProps} = useProps<ICheckboxBtnProps>(props)

	const foxySelectionControlRef = ref<TFoxySelectionControl>()

	const indeterminate = useVModel(props, 'indeterminate')
	const model = useVModel(props, 'modelValue')

	const {hasSlot} = useSlots()

	const handleChange = (_v: any) => {
		if (indeterminate.value) {
			indeterminate.value = false
		}
	}
	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const falseIcon = computed(() => {
		return indeterminate.value
				? props.indeterminateIcon
				: props.falseIcon
	})
	const trueIcon = computed(() => {
		return indeterminate.value
				? props.indeterminateIcon
				: props.trueIcon
	})

	const controlProps = computed(() => {
		return foxySelectionControlRef.value?.filterProps(props, ['modelValue', 'falseIcon', 'trueIcon', 'type', 'class', 'style'])
	})

	// CLASS & STYLES

	const checkboxBtnStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const checkboxBtnClasses = computed(() => {
		return [
			'foxy-checkbox-btn',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
