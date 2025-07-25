<template>
	<origam-input
			:id="id"
			ref="origamInputRef"
			v-model="model"
			:class="radioClasses"
			:focused="isFocused"
			:style="radioStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<origam-radio-btn
						:id="id"
						ref="origamRadioBtnRef"
						v-model="model"
						:aria-describedby="messagesId"
						:disabled="isDisabled"
						:error="!isValid"
						:readonly="isReadonly"
						v-bind="{ ...radioBtnProps, ...controlAttrs }"
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
				</origam-radio-btn>
			</slot>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="slots.details"
				#details="detailsSlotProps"
		>
			<slot
					name="details"
					v-bind="detailsSlotProps"
			/>
		</template>

		<template
				v-if="slots.messages"
				#messages="{hasMessages, messages}"
		>
			<slot
					name="messages"
					v-bind="{hasMessages, messages}"
			/>
		</template>

		<template
				v-if="slots.message"
				#message="{message}"
		>
			<slot
					name="message"
					v-bind="{message}"
			/>
		</template>
	</origam-input>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'
	import { OrigamInput, OrigamRadioBtn } from '../../components'

	import { useFocus, useProps, useVModel } from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IRadioProps } from '../../interfaces'

	import type { TOrigamInput, TOrigamRadioBtn } from "../../types"

	import { filterInputAttrs, getUid } from '../../utils'

	const props = withDefaults(defineProps<IRadioProps>(), {
		density: DENSITY.DEFAULT
	})

	const emits = defineEmits(['update:modelValue', 'update:focused', 'click:label'])

	const {filterProps} = useProps<IRadioProps>(props)

	const origamInputRef = ref<TOrigamInput>()
	const origamRadioBtnRef = ref<TOrigamRadioBtn>()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const slots = useSlots()

	const uid = getUid()
	const id = computed(() => props.id || `radio-${uid}`)

	const handleClickLabel = (e: Event) => {
		emits('click:label', e)
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const radioBtnProps = computed(() => {
		return origamRadioBtnRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'disabled', 'readonly', 'error'])
	})

	// CLASS & STYLES

	const radioStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const radioClasses = computed(() => {
		return [
			'origam-radio',
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
	.origam-radio {
		&.origam-input {
			flex: 0 1 auto;
		}

		.origam-selection-control {
			min-height: calc(56px + 2 * var(--origam-input---density));
		}
	}
</style>

<style>
	:root {

	}
</style>
