<template>
	<foxui-text-field
			ref="foxuiTextFieldRef"
			v-model:focused="isFocused"
			:aria-label="t(label)"
			:class="datePickerFieldClasses"
			:counter-value="counterValue"
			:dirty="isDirty"
			:placeholder="placeholder"
			:style="datePickerFieldStyles"
			:title="t(label)"
			:validation-value="validationValue"
			v-bind="{ ...textFieldProps }"
			@blur="handleBlur"
			@change="handleChange"
			@click:clear="handleClear"
			@mousedown:control="handleMousedownControl"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template
				v-if="slots.loader"
				#loader
		>
			<slot name="loader"/>
		</template>

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
			<foxui-menu
					ref="foxuiMenuRef"
					v-model="menu"
					:close-on-content-click="false"
					:disabled="menuDisabled"
					:location="BLOCK.BOTTOM"
					:open-on-click="false"
					activator="parent"
					content-class="foxui-date-picker-field__content"
					v-bind="{ ...menuProps }"
					@after-leave="handleAfterLeave"
			>

				<template #default>
					<foxui-date-picker
							ref="foxuiDatePickerRef"
							:model-value="model"
							v-bind="{...datePickerProps}"
							@update:model-value="handleSelectDate"
					/>
				</template>
			</foxui-menu>

			<template v-if="selectedValues">
				<template v-if="isRange">
					<span class="foxui-date-picker-field__selection-text">
            <slot name="rangeSelection">
              {{ t('foxui.datePickerRangeField.text', selectedValues[0], selectedValues[1]) }}
            </slot>
          </span>
				</template>
				<template v-else>
					<template
							v-for="(item, index) in selectedValues"
							:key="index"
					>
						<div
								:style="[textColorStyles]"
								class="foxui-date-picker-field__selection-chips"
						>
							<template v-if="isMultiple">
								<slot
										name="chip"
										v-bind="{ item, index, props: chipSlotProps(item) }"
								>
									<foxui-chip
											key="chip"
											ref="foxuiChipsRef"
											v-bind="chipSlotProps(item)"
									>
										<template #default>
											<slot name="selection">
												{{ item }}
											</slot>
										</template>
									</foxui-chip>
								</slot>
							</template>
							<template v-else>
			          <span class="foxui-date-picker-field__selection-text">
			            <slot name="selection">
			              {{ item }}
			            </slot>
			          </span>
							</template>
						</div>
					</template>
				</template>
			</template>
		</template>

		<template
				v-if="slots.suffix"
				#suffix
		>
			<slot name="suffix"/>
		</template>

		<template #appendInner>
			<slot name="appendInner">
				<foxui-avatar
						v-if="appendInnerAvatar"
						key="append-avatar"
						:density="density"
						:image="appendInnerAvatar"
				/>
				<foxui-icon
						v-if="appendInnerIcon"
						key="append-icon"
						:density="density"
						:icon="appendInnerIcon"
				/>
			</slot>
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
	</foxui-text-field>
</template>

<script
		lang="ts"
		setup
>
	import {
		FoxuiAvatar,
		FoxuiChip,
		FoxuiDatePicker,
		FoxuiIcon,
		FoxuiMenu,
		FoxuiTextField,
		FoxuiTranslateScale
	} from "@foxui/components"

	import { useDate, useLocale, useProps, useTextColor, useVModel } from "@foxui/composables"

	import { FOXUI_FORM_KEY } from "@foxui/consts"

	import { BLOCK, DENSITY, DIRECTION, KEYBOARD_VALUES, MDI_ICONS, TEXT_FIELD_TYPE } from "@foxui/enums"

	import type { IDatePickerFieldProps } from "@foxui/interfaces"

	import type { TFoxuiDatePicker, TFoxuiMenu, TFoxuiTextField, TTransitionProps } from "@foxui/types"

	import { forwardRefs, isEmpty, matchesSelector, wrapInArray } from "@foxui/utils"

	import { computed, inject, nextTick, ref, shallowRef, StyleValue, toRef, useSlots, watch } from "vue"

	const props = withDefaults(defineProps<IDatePickerFieldProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		border: true,
		rounded: true,
		modelValue: null,
		appendInnerIcon: MDI_ICONS.CALENDAR_OUTLINE,
		transition: () => ({component: FoxuiTranslateScale}) as unknown as TTransitionProps,
		closeText: 'foxui.close',
		openText: 'foxui.open',
		range: false,
		closeOnSelect: true
	})

	const {filterProps} = useProps<IDatePickerFieldProps>(props)

	const {t} = useLocale()

	const foxuiTextFieldRef = ref<TFoxuiTextField>()
	const foxuiMenuRef = ref<TFoxuiMenu>()
	const foxuiDatePickerRef = ref<TFoxuiDatePicker>()

	const slots = useSlots()

	const model = useVModel(
			props,
			'modelValue',
			[],
			(v) => wrapInArray(v),
			(v) => props.range || props.multiple ? v : v[0]
	)

	const adapter = useDate()

	const handleSelectDate = (dates: string | Array<string>) => {
		model.value = wrapInArray(dates)

		nextTick(() => {
			if (closeOnSelect.value) {
				menu.value = false
			}
		})
	}
	const handleRemoveDate = (date: string) => {
		const index = model.value.findIndex((selection) => selection === date)

		const value = [...model.value]

		value.splice(index, 1)
		model.value = value
	}

	const {textColorStyles} = useTextColor(toRef(props, 'color'))

	const menuState = useVModel(props, 'menu')
	const menu = computed<boolean>({
		get: () => menuState.value,
		set: (v) => {
			if (menuState.value && !v && foxuiMenuRef.value?.openChildren) {
				return
			}

			menuState.value = v
		}
	})

	const selectedValues = computed(() => {
		let selectedDates = [...model.value]

		if (isRange.value) {
			selectedDates = [model.value[0], model.value[model.value.length - 1]]
		}

		return selectedDates.map((selection) => {
			return adapter.format(adapter.date(selection), 'keyboardDate')
		})
	})

	const hasSelectedValues = computed(() => {
		return !isEmpty(selectedValues.value)
	})

	const isMultiple = computed(() => {
		return props.multiple && model.value.length > 1
	})
	const isRange = computed(() => {
		return props.range && model.value.length > 1
	})

	const isFocused = shallowRef(false)
	const form = inject(FOXUI_FORM_KEY, null)

	const menuDisabled = computed(() => {
		return props.readonly || form?.isReadonly.value
	})
	const menuProps = computed(() => {
		return {
			...props.menuProps,
			activatorProps: {
				...(props.menuProps?.activatorProps || {}),
				'aria-haspopup': 'datepickerbox' // Set aria-haspopup to 'listbox'
			}
		}
	})

	const handleClear = () => {
		model.value = []

		if (props.openOnClear) {
			menu.value = true
		}
	}
	const handleMousedownControl = () => {
		if (menuDisabled.value) return

		menu.value = !menu.value
	}
	const handleBlur = (e: FocusEvent) => {
		if (!foxuiDatePickerRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
			menu.value = false
		}

		if (hasSelectedValues.value) {
			isFocused.value = true
		}
	}
	const handleChange = () => {
		if (matchesSelector(foxuiTextFieldRef.value, ':autofill') || matchesSelector(foxuiTextFieldRef.value, ':-webkit-autofill')) {
			// (e.target as HTMLInputElement).value
			// TODO -  Select date
		}
	}
	const handleAfterLeave = () => {
		if (isFocused.value) {
			foxuiTextFieldRef.value?.focus()
		}
	}

	const chipSlotProps = (item: string) => {
		return {
			closable: props.closableChips,
			bgColor: 'rgba(168, 168, 168, 1)',
			color: 'rgb(255, 255, 255)',
			border: true,
			rounded: true,
			'onClick:close': (e: Event) => handleChipClose(e, item),
			onKeydown: (e: KeyboardEvent) => handleChipKeydown(e, item),
			onMousedown: (e: MouseEvent) => handleChipMousedown(e),
			modelValue: true,
			size: 'small',
			...props.chipProps
		}
	}

	const handleChipClose = (e: Event, item: string) => {
		e.stopPropagation()
		e.preventDefault()

		handleRemoveDate(item)
	}
	const handleChipKeydown = (e: KeyboardEvent, item: string) => {
		if (e.key !== KEYBOARD_VALUES.ENTER && e.key !== KEYBOARD_VALUES.EMPTY) return

		e.preventDefault()
		e.stopPropagation()

		handleChipClose(e, item)
	}
	const handleChipMousedown = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const textFieldProps = computed(() => {
		return foxuiTextFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
	})

	const datePickerProps = computed(() => {
		return foxuiDatePickerRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue'])
	})

	const isDirty = computed(() => {
		return model.value.length > 0
	})
	const placeholder = computed(() => {
		return isDirty.value || (!isFocused.value && props.label && !props.persistentPlaceholder) ? undefined : props.placeholder
	})
	const label = computed(() => {
		return menu.value ? props.closeText : props.openText
	})
	const closeOnSelect = computed(() => {
		return props.closeOnSelect && !(props.multiple || props.range)
	})

	watch(selectedValues, () => {
		isFocused.value = hasSelectedValues.value
	}, {
		immediate: true,
		deep: true
	})

	// CLASS & STYLES

	const datePickerFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const datePickerFieldClasses = computed(() => {
		return [
			'foxui-date-picker-field',
			`foxui-date-picker-field--${props.range ? 'range' : 'single'}`,
			{
				'foxui-date-picker-field--active-menu': menu.value
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({
		filterProps,
		isFocused,
		menu
	}, foxuiTextFieldRef))
</script>

<style
		lang="scss"
		scoped
>

</style>
