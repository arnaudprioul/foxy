<template>
	<foxy-input
			:id="id"
			ref="foxyInputRef"
			v-model="model"
			:class="radioClasses"
			:focused="isFocused"
			:style="radioStyles"
			v-bind="{...rootAttrs, ...inputProps}">
		<template v-if="hasSlot('prepend')" #prepend>
			<slot name="prepend"/>
		</template>

		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
				<foxy-radio-btn
						ref="foxyRadioBtnRef"
						:id="id"
						v-model="model"
						:aria-describedby="messagesId"
						:disabled="isDisabled"
						:error="!isValid"
						:readonly="isReadonly"
						v-bind="{ ...radioBtnProps, ...controlAttrs }"
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
				</foxy-radio-btn>
			</slot>
		</template>

		<template v-if="hasSlot('append')" #append>
			<slot name="append"/>
		</template>

		<template v-if="hasSlot('details')" #details="detailsSlotProps">
			<slot name="details" v-bind="detailsSlotProps"/>
		</template>

		<template v-if="hasSlot('messages')" #messages="{hasMessages, messages}">
			<slot name="messages" v-bind="{hasMessages, messages}"/>
		</template>

		<template v-if="hasSlot('message')" #message="{message}">
			<slot name="message" v-bind="{message}"/>
		</template>
	</foxy-input>
</template>

<script lang="ts" setup>
	import { FoxyInput, FoxyRadioBtn } from '@foxy/components'

	import { useFocus, useProps, useSlots, useVModel } from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import { IRadioProps } from '@foxy/interfaces'
	import { TFoxyInput, TFoxyRadioBtn } from "@foxy/types"

	import { filterInputAttrs, getUid, keys, omit, pick } from '@foxy/utils'

	import { computed, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IRadioProps>(), {
		density: DENSITY.DEFAULT,
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<IRadioProps>(props)

	const foxyInputRef = ref<TFoxyInput>()
	const foxyRadioBtnRef = ref<TFoxyRadioBtn>()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const {hasSlot} = useSlots()

	const uid = getUid()
	const id = computed(() => props.id || `radio-${uid}`)

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return foxyInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const radioBtnProps = computed(() => {
		return foxyRadioBtnRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'disabled', 'readonly', 'error'])
	})

	// CLASS & STYLES

	const radioStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const radioClasses = computed(() => {
		return [
			'foxy-radio',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-radio {
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
