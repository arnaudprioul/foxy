<template>
	<origam-text-field
			ref="origamTextFieldRef"
			v-model:model-value="inputText"
			:class="numberFieldClasses"
			:style="numberFieldStyles"
			:validation-value="model"
			inputmode="decimal"
			v-bind="textFieldProps"
			@beforeinput="handleBeforeInput"
			@blur="handleBlur"
			@click="handleClick"
			@focus="handleFocus"
			@keydown="handleKeydown"
			@mousedown="handleMousedown"
			@click:clear="handleClear"
			@click:prepend-inner="handleClickPrependInner"
			@click:append-inner="handleClickAppendInner"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template
				v-if="slots.field"
				#field="{id, isDisabled, isDirty, isValid, isReadonly}"
		>
			<slot
					name="field"
					v-bind="{id, isDisabled, isDirty, isValid, isReadonly}"
			/>
		</template>

		<template
				v-if="slots.loader"
				#loader
		>
			<slot name="loader"/>
		</template>

		<template #prependInner>
			<div
					v-if="!hideControls"
					class="origam-number-field__control"
			>
				<template v-if="split">
					<slot
							name="increment"
							v-bind="{canIncrease, onControlClick: () => handleControlClick, onUpControlMousedown: () => handleUpControlMousedown, onControlMouseup: () => handleControlMouseup}"
					>
						<origam-btn
								key="increment-btn"
								:disabled="!canIncrease"
								:icon="incrementIcon"
								aria-hidden="true"
								flat
								height="100%"
								tabindex="-1"
								@click="handleControlClick"
								@pointerdown="handleUpControlMousedown"
								@pointerup="handleControlMouseup"
						/>
					</slot>

					<origam-divider :direction="DIRECTION.VERTICAL"/>
				</template>
			</div>

			<slot name="prependInner"/>
		</template>

		<template
				v-if="slots.floatingLabel"
				#floatingLabel
		>
			<slot name="floatingLabel"/>
		</template>

		<template
				v-if="slots.label"
				#label
		>
			<slot name="label"/>
		</template>

		<template
				v-if="slots.prefix"
				#prefix
		>
			<slot name="prefix"/>
		</template>

		<template
				v-if="slots.default"
				#default="slotProps"
		>
			<slot
					name="default"
					v-bind="slotProps"
			/>
		</template>

		<template
				v-if="slots.suffix"
				#suffix
		>
			<slot name="suffix"/>
		</template>

		<template
				v-if="hasAppendInner"
				#appendInner
		>
			<div
					v-if="!hideControls"
					class="origam-number-field__control"
			>
				<template v-if="!split">
					<origam-divider :direction="DIRECTION.VERTICAL"/>

					<slot
							name="increment"
							v-bind="{canIncrease, onControlClick: () => handleControlClick, onUpControlMousedown: () => handleUpControlMousedown, onControlMouseup: () => handleControlMouseup}"
					>
						<origam-btn
								key="increment-btn"
								:disabled="!canIncrease"
								:icon="incrementIcon"
								aria-hidden="true"
								flat
								height="auto"
								tabindex="-1"
								@click="handleControlClick"
								@pointerdown="handleUpControlMousedown"
								@pointerup="handleControlMouseup"
						/>
					</slot>
				</template>

				<origam-divider :direction="DIRECTION.VERTICAL"/>

				<slot
						name="decrement"
						v-bind="{canDecrease, onControlClick: () => handleControlClick, onDownControlMousedown: () => handleDownControlMousedown, onControlMouseup: () => handleControlMouseup}"
				>
					<origam-btn
							key="decrement-btn"
							:disabled="!canDecrease"
							:icon="decrementIcon"
							aria-hidden="true"
							flat
							height="auto"
							tabindex="-1"
							@click="handleControlClick"
							@pointerdown="handleDownControlMousedown"
							@pointerup="handleControlMouseup"
					/>
				</slot>
			</div>

			<slot name="appendInner"/>
		</template>

		<template
				v-if="slots.clear"
				#clear
		>
			<slot name="clear"/>
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
	</origam-text-field>
</template>

<script
		lang="ts"
		setup
>
	import { computed, nextTick, onMounted, ref, shallowRef, StyleValue, useSlots, watch, watchEffect } from "vue"
	import { OrigamBtn, OrigamDivider, OrigamTextField } from "../../components"

	import { useAdjacentInner, useFocus, useForm, useHold, useProps, useVModel } from "../../composables"

	import { DIRECTION, MDI_ICONS, TEXT_FIELD_TYPE } from "../../enums"

	import type { INumberFieldProps } from "../../interfaces"

	import type { TOrigamTextField } from "../../types"

	import { clamp, forwardRefs, omit } from "../../utils"

	const props = withDefaults(defineProps<INumberFieldProps>(), {
		modelValue: null,
		min: Number.MIN_SAFE_INTEGER,
		max: Number.MAX_SAFE_INTEGER,
		step: 1,
		precision: 0,
		incrementIcon: MDI_ICONS.PLUS,
		decrementIcon: MDI_ICONS.MINUS,
		holdDelay: 500,
		holdRepeat: 50,
		border: true,
		rounded: true,
		centerAffix: true,
		split: false,
		type: TEXT_FIELD_TYPE.NUMBER
	})

	const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

	const {filterProps} = useProps<INumberFieldProps>(props)

	const slots = useSlots()

	const origamTextFieldRef = ref<TOrigamTextField>()

	const form = useForm(omit(props, ['modelValue']))
	const controlsDisabled = computed(() => (
			form.isDisabled.value || form.isReadonly.value
	))

	const model = useVModel(props, 'modelValue', null,
			val => val ?? null,
			val => val == null
					? val ?? null
					: clamp(Number(val), props.min, props.max))
	const {isFocused, onFocus, onBlur} = useFocus(props)
	const {
		onClickPrependInner: handleClickPrependInner,
		onClickAppendInner: handleClickAppendInner
	} = useAdjacentInner(props)

	const correctPrecision = (val: number, precision = props.precision) => {
		const fixed = precision == null
				? String(val)
				: val.toFixed(precision)
		return isFocused.value
				? Number(fixed).toString() // trim zeros
				: fixed
	}

	const _inputText = shallowRef<string | null>(null)
	watchEffect(() => {
		if (isFocused.value && !controlsDisabled.value) {
			// ignore external changes
		} else if (model.value == null) {
			_inputText.value = null
		} else if (!isNaN(model.value)) {
			_inputText.value = correctPrecision(model.value)
		}
	})
	const inputText = computed<string | null>({
		get: () => _inputText.value,
		set (val) {
			if (val === null || val === '') {
				model.value = null
				_inputText.value = null
			} else if (!isNaN(Number(val)) && Number(val) <= props.max && Number(val) >= props.min) {
				model.value = Number(val)
				_inputText.value = val
			}
		}
	})

	const canIncrease = computed(() => {
		if (controlsDisabled.value) return false
		return (model.value ?? 0) as number + props.step <= props.max
	})
	const canDecrease = computed(() => {
		if (controlsDisabled.value) return false
		return (model.value ?? 0) as number - props.step >= props.min
	})

	watch(() => props.precision, () => formatInputValue())

	onMounted(() => {
		clampModel()
	})

	const inferPrecision = (value: number | null) => {
		if (value == null) return 0

		const str = value.toString()
		const idx = str.indexOf('.')

		return ~idx ? str.length - idx : 0
	}

	const toggleUpDown = (increment = true) => {
		if (controlsDisabled.value) return

		if (model.value == null) {
			inputText.value = correctPrecision(clamp(0, props.min, props.max))
			return
		}

		let inferredPrecision = Math.max(inferPrecision(model.value), inferPrecision(props.step))

		if (props.precision != null) inferredPrecision = Math.max(inferredPrecision, props.precision)

		if (increment) {
			if (canIncrease.value) inputText.value = correctPrecision(model.value + props.step, inferredPrecision)
		} else {
			if (canDecrease.value) inputText.value = correctPrecision(model.value - props.step, inferredPrecision)
		}
	}

	const {holdStart, holdStop} = useHold({toggleUpDown}, props.holdRepeat, props.holdDelay)

	const handleBeforeInput = (e: InputEvent) => {
		if (!e.data) return

		const existingTxt = (e.target as HTMLInputElement)?.value
		const selectionStart = (e.target as HTMLInputElement)?.selectionStart
		const selectionEnd = (e.target as HTMLInputElement)?.selectionEnd
		const potentialNewInputVal =
				existingTxt
						? existingTxt.slice(0, selectionStart as number | undefined) + e.data + existingTxt.slice(selectionEnd as number | undefined)
						: e.data

		if (!/^-?(\d+(\.\d*)?|(\.\d+)|\d*|\.)$/.test(potentialNewInputVal)) {
			e.preventDefault()
		}

		if (props.precision == null) return

		// Ignore decimal digits above precision limit
		if (potentialNewInputVal.split('.')[1]?.length > props.precision) {
			e.preventDefault()
		}
		// Ignore decimal separator when precision = 0
		if (props.precision === 0 && potentialNewInputVal.includes('.')) {
			e.preventDefault()
		}
	}
	const handleKeydown = async (e: KeyboardEvent) => {
		if (
				['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key) ||
				e.ctrlKey
		) return

		if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
			e.preventDefault()
			clampModel()
			// _model is controlled, so need to wait until props['modelValue'] is updated
			await nextTick()
			if (e.key === 'ArrowDown') {
				toggleUpDown(false)
			} else {
				toggleUpDown()
			}
		}
	}
	const handleControlClick = (e: MouseEvent) => {
		e.stopPropagation()
	}
	const handleControlMouseup = (e: PointerEvent) => {
		const el = e.currentTarget as HTMLElement

		el?.releasePointerCapture(e.pointerId)

		e.preventDefault()
		e.stopPropagation()

		holdStop()
	}
	const handleUpControlMousedown = (e: PointerEvent) => {
		const el = e.currentTarget as HTMLElement

		el?.setPointerCapture(e.pointerId)

		e.preventDefault()
		e.stopPropagation()

		holdStart('up')
	}
	const handleDownControlMousedown = (e: PointerEvent) => {
		const el = e.currentTarget as HTMLElement

		el?.setPointerCapture(e.pointerId)

		e.preventDefault()
		e.stopPropagation()

		holdStart('down')
	}
	const handleMousedown = (e: MouseEvent) => {
		emits('mousedown:control', e)
	}
	const handleClick = (e: MouseEvent) => {
		emits('click:control', e)
	}
	const handleClear = (e: MouseEvent) => {
		emits('click:clear', e)
	}

	const clampModel = () => {
		if (controlsDisabled.value) return
		if (!origamTextFieldRef.value) return

		const actualText = origamTextFieldRef.value.value

		if (actualText && !isNaN(Number(actualText))) {
			inputText.value = correctPrecision(clamp(Number(actualText), props.min, props.max))
		} else {
			inputText.value = null
		}
	}
	const formatInputValue = () => {
		if (controlsDisabled.value) return

		if (model.value === null || isNaN(model.value)) {
			inputText.value = null
			return
		}

		inputText.value = props.precision == null
				? String(model.value)
				: model.value.toFixed(props.precision)
	}
	const trimDecimalZeros = () => {
		if (controlsDisabled.value) return

		if (model.value === null || isNaN(model.value)) {
			inputText.value = null
			return
		}

		inputText.value = model.value.toString()
	}

	const handleFocus = () => {
		onFocus()
		trimDecimalZeros()
	}
	const handleBlur = () => {
		onBlur()
		clampModel()
	}

	const textFieldProps = computed(() => {
		return origamTextFieldRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'validationValue'])
	})

	const hasAppendInner = computed(() => {
		return slots.appendInner || !props.hideControls
	})

	// CLASS & STYLES

	const numberFieldClasses = computed(() => {
		return [
			'origam-number-field',
			{
				'origam-number-field--hide-input': props.hideInput,
				'origam-number-field--inset': props.inset,
				'origam-number-field--split': props.split,
				'origam-number-field--hide-controls': props.hideControls,
				'origam-number-field--reverse': props.reverse
			},
			props.class
		]
	})
	const numberFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	defineExpose(forwardRefs({filterProps}, origamTextFieldRef))

</script>

<style
		lang="scss"
		scoped
>
	.origam-number-field {
		$this: &;

		:deep(input[type=number]) {
			-moz-appearance: textfield;

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
			}
		}

		:deep(.origam-field) {
			.origam-field__prepend-inner {
				&:has(.origam-number-field__control) {
					> .origam-icon {
						margin-inline-end: 12px;
					}
				}
			}

			.origam-field__append-inner {
				&:has(.origam-number-field__control) {
					> .origam-icon {
						margin-inline-end: 12px;
					}
				}
			}
		}

		:deep(.origam-field--appended) {
			--origam-field---padding-end: 0;
		}

		&__control {
			display: flex;
			height: 100%;

			.origam-btn {
				background-color: transparent;
				border-radius: 0;
			}
		}

		&--inset {
			.origam-divider {
				height: 55%;
				width: 55%;
				align-self: center
			}
		}

		&--split {
			:deep(.origam-field__input) {
				text-align: center;
			}

			:deep(.origam-field--prepended) {
				--origam-field---padding-start: 0;
			}
		}

		&--hide-input {
			:deep(.origam-field) {
				flex: none;
			}

			:deep(.origam-field__input) {
				width: 0;
				padding-inline: 0;
			}
		}
	}
</style>
