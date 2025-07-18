<template>
	<foxui-input
			:id="id"
			ref="foxuiInputRef"
			v-model="model"
			:class="checkboxClasses"
			:focused="isFocused"
			:style="checkboxStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<foxui-checkbox-btn
						:id="id"
						ref="foxuiCheckboxBtnRef"
						v-model="model"
						:aria-describedby="messagesId"
						:disabled="isDisabled"
						:error="!isValid"
						:readonly="isReadonly"
						v-bind="{ ...checkboxBtnProps, ...controlAttrs }"
						@blur="handleBlur"
						@focus="handleFocus"
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
				</foxui-checkbox-btn>
			</slot>
		</template>
	</foxui-input>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiCheckboxBtn, FoxuiInput } from '@foxui/components'

	import { useFocus, useProps, useVModel } from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { ICheckboxProps } from '@foxui/interfaces'

	import type { TFoxuiCheckboxBtn, TFoxuiInput } from "@foxui/types"

	import { filterInputAttrs, getUid } from '@foxui/utils'

	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICheckboxProps>(), {
		density: DENSITY.DEFAULT
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<ICheckboxProps>(props)

	const foxuiInputRef = ref<TFoxuiInput>()
	const foxuiCheckboxBtnRef = ref<TFoxuiCheckboxBtn>()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const slots = useSlots()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `checkbox-${uid}`
	})

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return foxuiInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const checkboxBtnProps = computed(() => {
		return foxuiCheckboxBtnRef.value?.filterProps(props, ['class', 'style', 'modelValue', 'id', 'disabled', 'readonly', 'error'])
	})

	// CLASS & STYLES

	const checkboxStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const checkboxClasses = computed(() => {
		return [
			'foxui-checkbox',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-checkbox {
		&.foxui-input {
			flex: 0 1 auto;
		}

		.foxui-selection-control {
			min-height: calc(56px + 2 * var(--foxui-input---density));
		}
	}
</style>

<style>
	:root {

	}
</style>
