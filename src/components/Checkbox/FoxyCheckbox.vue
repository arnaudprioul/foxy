<template>
	<foxy-input
			:id="id"
			ref="inputRef"
			v-model="model"
			:class="checkboxClasses"
			:focused="isFocused"
			:style="checkboxStyles"
			v-bind="{...rootAttrs, ...inputProps}">
		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
				<foxy-checkbox-btn
						ref="checkboxBtnRef"
						:id="id"
						v-model="model"
						:aria-describedby="messagesId"
						:disabled="isDisabled"
						:error="!isValid"
						:readonly="isReadonly"
						v-bind="{ ...checkboxBtnProps, ...controlAttrs }"
						@blur="handleBlur"
						@focus="handleFocus"
						@click:label="handleClickLabel">
					<template v-if="hasSlot('default')" #default>
						<slot name="default"/>
					</template>

					<template v-if="hasSlot('input')" #input="{props, icon, textColorStyles, backgroundColorStyles, model}">
						<slot name="input" v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"/>
					</template>

					<template v-if="hasSlot('label')" #label>
						<slot name="label"/>
					</template>
				</foxy-checkbox-btn>
			</slot>
		</template>
	</foxy-input>
</template>

<script lang="ts" setup>
	import { FoxyCheckboxBtn, FoxyInput } from '@foxy/components'

	import { useFocus, useProps, useSlots, useVModel } from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import { ICheckboxProps } from '@foxy/interfaces'
	import { TFoxyCheckboxBtn, TFoxyInput } from "@foxy/types"

	import { filterInputAttrs, getUid } from '@foxy/utils'

	import { computed, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<ICheckboxProps>(), {
		density: DENSITY.DEFAULT,
		trueIcon: '$checkboxOn',
		falseIcon: '$checkboxOff'
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<ICheckboxProps>(props)

	const inputRef = ref<TFoxyInput>()
	const checkboxBtnRef = ref<TFoxyCheckboxBtn>()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const {hasSlot} = useSlots()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `checkbox-${uid}`
	})

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return inputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const checkboxBtnProps = computed(() => {
		return checkboxBtnRef.value?.filterProps(props, ['class', 'style', 'modelValue', 'id', 'disabled', 'readonly', 'error'])
	})

	// CLASS & STYLES

	const checkboxStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const checkboxClasses = computed(() => {
		return [
			'foxy-checkbox',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-checkbox {
		&.foxy-input {
			flex: 0 1 auto;
		}

		.foxy-selection-control {
			min-height: calc(56px + 2 * var(--foxy-input---density));
		}
	}
</style>

<style>
	:root {

	}
</style>
