<template>
	<foxui-input
			:id="id"
			ref="foxuiInputRef"
			v-model="model"
			:class="radioGroupClasses"
			:style="radioGroupStyles"
			v-bind="{ ...rootAttrs, ...inputProps }"
	>
		<template #default="{id, messagesId, isDisabled, isReadonly, isValid}">
			<slot
					name="default"
					v-bind="{id, messagesId, isDisabled, isReadonly, isValid}"
			>

				<slot
						name="label"
						v-bind="{label, required}"
				>
					<foxui-label
							:id="id"
							:required="required"
							:text="label"
					/>
				</slot>

				<foxui-selection-control-group
						:id="id"
						ref="foxuiSelectionControlGroupRef"
						v-model="model"
						:aria-describedby="messagesId"
						:aria-labelledby="label ? id : undefined"
						:disabled="isDisabled"
						:items="items"
						:multiple="false"
						:readonly="isReadonly"
						v-bind="{ ...controlProps , ...controlAttrs}"
				>
					<template #item="{item}">
						<slot
								name="item"
								v-bind="{id, messagesId, isDisabled, isReadonly, isValid}"
						>
							<foxui-radio
									ref="foxuiRadioRef"
									v-model="model"
									:aria-describedby="messagesId"
									:disabled="isDisabled"
									:readonly="isReadonly"
									v-bind="item"
							/>
						</slot>
					</template>
				</foxui-selection-control-group>
			</slot>
		</template>
	</foxui-input>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiInput, FoxuiLabel, FoxuiRadio, FoxuiSelectionControlGroup } from '@foxui/components'

	import { useProps, useVModel } from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { IRadioGroupProps } from '@foxui/interfaces'
	import type { TFoxuiInput, TFoxuiRadio, TFoxuiSelectionControlGroup } from "@foxui/types"

	import { filterInputAttrs, getUid } from '@foxui/utils'

	import { computed, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IRadioGroupProps>(), {
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<IRadioGroupProps>(props)

	const foxuiSelectionControlGroupRef = ref<TFoxuiSelectionControlGroup>()
	const foxuiInputRef = ref<TFoxuiInput>()
	const foxuiRadioRef = ref<TFoxuiRadio>()

	const attrs = useAttrs()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `radio-group-${uid}`
	})
	const model = useVModel(props, 'modelValue')

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
	const inputProps = computed(() => {
		return foxuiInputRef.value?.filterProps(props, ['modelValue', 'id', 'focused', 'style', 'class'])
	})
	const controlProps = computed(() => {
		return foxuiSelectionControlGroupRef.value?.filterProps(props, ['modelValue', 'id', 'style', 'class', 'readonly', 'disabled', 'type', 'multiple', 'items'])
	})
	const radioProps = computed(() => {
		return foxuiRadioRef.value.filterProps(props)
	})

	const items = computed(() => {
		return props.items?.map((item) => {
			return {
				...radioProps.value,
				...item
			}
		})
	})

	// CLASS & STYLES

	const radioGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const radioGroupClasses = computed(() => {
		return [
			'foxui-radio-group',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
