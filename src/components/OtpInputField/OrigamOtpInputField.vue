<template>
	<div
			:class="otpInputFieldClasses"
			:style="otpInputFieldStyles"
			v-bind="{ ...rootAttrs }"
	>
		<div
				ref="contentRef"
				:style="dimensionStyles"
				class="origam-otp-input-field__content"
		>
			<template
					v-for="(_, i) in fields"
					:key="i"
			>
				<template v-if="divider && i !== 0">
					<span class="origam-otp-input-field__divider">
						{{ divider }}
					</span>
				</template>

				<origam-field
						ref="origamFieldRef"
						:focused="(isFocused && focusAll) || focusIndex === i"
						v-bind="{...fieldProps(i)}"
				>
					<template
							v-if="slots.prependInner"
							#prependInner
					>
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

					<template #default>
						<input
								ref="inputRef"
								:aria-label="t(label, i + 1)"
								:autofocus="i === 0 && autofocus"
								:disabled="disabled"
								:inputmode="type === 'number' ? 'numeric' : 'text'"
								:maxlength="i === 0 ? length : '1'"
								:min="type === 'number' ? 0 : undefined"
								:placeholder="placeholder"
								:type="type === 'number' ? 'text' : type"
								:value="model[i]"
								autocomplete="one-time-code"
								class="origam-otp-input-field__field"
								@blur="handleBlur"
								@focus="handleFocus($event, i)"
								@input="handleInput"
								@keydown="handleKeydown"
								@paste="handlePaste(i, $event)"
						/>
					</template>

					<template
							v-if="slots.suffix"
							#suffix
					>
						<slot name="suffix"/>
					</template>

					<template
							v-if="slots.appendInner"
							#appendInner
					>
						<slot name="appendInner"/>
					</template>

					<template
							v-if="slots.clear"
							#clear
					>
						<slot name="clear"/>
					</template>
				</origam-field>
			</template>

			<input
					:value="model.join('')"
					class="origam-otp-input-field__input"
					type="hidden"
					v-bind="{ ...inputAttrs }"
			/>

			<origam-overlay
					:model-value="!!loading"
					contained
					content-class="origam-otp-input-field__loader"
					persistent
			>
				<template #loader>
					<slot name="loader">
						<origam-progress
								:color="typeof props.loading === 'boolean' ? undefined : loading"
								:size="24"
								:type="PROGRESS_TYPE.CIRCULAR"
								indeterminate
								width="2"
						/>
					</slot>
				</template>
			</origam-overlay>

			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>

	import { computed, nextTick, ref, StyleValue, useAttrs, useSlots, watch } from "vue"
	import { OrigamField, OrigamOverlay, OrigamProgress } from "../../components"

	import { useDimension, useFocus, useLocale, useProps, useVModel } from "../../composables"

	import { OTP_INPUT_FIELD_TYPE, PROGRESS_TYPE } from "../../enums"

	import type { IOtpInputFieldProps } from "../../interfaces"

	import type { TOrigamField } from "../../types"

	import { filterInputAttrs, focusChild } from "../../utils"

	const props = withDefaults(defineProps<IOtpInputFieldProps>(), {
		type: OTP_INPUT_FIELD_TYPE.NUMBER,
		label: 'origam.input.otp',
		length: 6
	})

	const emits = defineEmits(['finish', 'update:focused', 'update:modelValue'])

	const {filterProps} = useProps<IOtpInputFieldProps>(props)

	const {t} = useLocale()
	const attrs = useAttrs()
	const slots = useSlots()

	const {dimensionStyles} = useDimension(props)
	const {isFocused, onFocus: focus, onBlur: blur} = useFocus(props)

	const model = useVModel(
			props,
			'modelValue',
			'',
			(val) => val == null ? [] : String(val).split(''),
			(val) => val.join('')
	)

	const length = computed(() => {
		return Number(props.length)
	})
	const fields = computed(() => {
		return Array(length.value).fill(0)
	})

	const focusIndex = ref(-1)

	const contentRef = ref<HTMLElement>()
	const inputRef = ref<Array<HTMLInputElement>>([])
	const origamFieldRef = ref<Array<TOrigamField>>([])

	const current = computed(() => {
		return inputRef.value[focusIndex.value]
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

	const fieldProps = (index: number) => {
		return origamFieldRef.value?.[index]?.filterProps(props, ['class', 'style', 'id', 'label'])
	}

	const handleInput = () => {
		// The maxlength attribute doesn't work for the number type input, so the text type is used.
		// The following logic simulates the behavior of a number input.
		if (isValidNumber(current.value.value)) {
			current.value.value = ''
			return
		}

		const array = model.value.slice()
		const value = current.value.value

		array[focusIndex.value] = value

		let target: any = null

		if (focusIndex.value > model.value.length) {
			target = model.value.length + 1
		} else if (focusIndex.value + 1 !== length.value) {
			target = 'next'
		}

		model.value = array

		if (target) focusChild(contentRef.value!, target)
	}

	const handleKeydown = (e: KeyboardEvent) => {
		const array = model.value.slice()
		const index = focusIndex.value
		let target: 'next' | 'prev' | 'first' | 'last' | number | null = null

		if (![
			'ArrowLeft',
			'ArrowRight',
			'Backspace',
			'Delete'
		].includes(e.key)) return

		e.preventDefault()

		if (e.key === 'ArrowLeft') {
			target = 'prev'
		} else if (e.key === 'ArrowRight') {
			target = 'next'
		} else if (['Backspace', 'Delete'].includes(e.key)) {
			array[focusIndex.value] = ''

			model.value = array

			if (focusIndex.value > 0 && e.key === 'Backspace') {
				target = 'prev'
			} else {
				requestAnimationFrame(() => {
					inputRef.value[index]?.select()
				})
			}
		}

		requestAnimationFrame(() => {
			if (target != null) {
				focusChild(contentRef.value!, target)
			}
		})
	}

	const handlePaste = (index: number, e: ClipboardEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const clipboardText = e?.clipboardData?.getData('Text').slice(0, length.value) ?? ''

		if (isValidNumber(clipboardText)) return

		model.value = clipboardText.split('')

		inputRef.value?.[index].blur()
	}

	const reset = () => {
		model.value = []
	}

	const handleFocus = (_e: FocusEvent, index: number) => {
		focus()

		focusIndex.value = index
	}

	const handleBlur = () => {
		blur()

		focusIndex.value = -1
	}

	const isValidNumber = (value: string) => {
		return props.type === 'number' && /[^0-9]/g.test(value)
	}

	watch(model, (val) => {
		if (val.length === length.value) emits('finish', val.join(''))
	}, {deep: true})

	watch(focusIndex, (val) => {
		if (val < 0) return

		nextTick(() => {
			inputRef.value[val]?.select()
		})
	})

	// CLASSES & STYLES

	const otpInputFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const otpInputFieldClasses = computed(() => {
		return [
			'origam-otp-input-field',
			{
				'origam-otp-input-field--divided': !!props.divider
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		blur: () => {
			inputRef.value?.some(input => input.blur())
		},
		focus: () => {
			inputRef.value?.[0].focus()
		},
		reset,
		isFocused,
		filterProps
	})

</script>

<style
		lang="scss"
		scoped
>
	.origam-otp-input-field {
		$this: &;

		align-items: center;
		display: flex;
		justify-content: center;
		padding: .5rem 0;
		position: relative;
		border-radius: 4px;

		.origam-field {
			height: 100%;
			--origam-field---padding-start: 0;
			--origam-field---padding-end: 0;
		}

		&__divider {
			margin: 0 8px;
		}

		&__content {
			align-items: center;
			display: flex;
			gap: .5rem;
			height: 64px;
			padding: .5rem;
			justify-content: center;
			max-width: 320px;
			position: relative;
			border-radius: inherit;
		}

		&__field {
			color: inherit;
			font-size: 1.25rem;
			height: 100%;
			outline: none;
			text-align: center;
			width: 100%;

			&[type=number]::-webkit-outer-spin-button,
			&[type=number]::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}

			&[type=number] {
				-moz-appearance: textfield;
			}
		}

		&__loader {
			align-items: center;
			display: flex;
			height: 100%;
			justify-content: center;
			width: 100%;

			.origam-progress {
				position: absolute;
			}
		}

		&--divided {
			#{$this}__content {
				max-width: 360px;
			}
		}
	}

</style>

<style>
	:root {

	}
</style>
