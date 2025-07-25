<template>
	<origam-text-field
			ref="origamTextFieldRef"
			v-model:focused="isFocused"
			:aria-label="t(label)"
			:class="colorPickerFieldClasses"
			:counter-value="counterValue"
			:dirty="isDirty"
			:placeholder="placeholder"
			:style="colorPickerFieldStyles"
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
				#prependInner
		>
			<origam-sheet
					:bg-color="selectedValue ?? HSVtoCSS(COLOR_NULL)"
					height="100%"
					min-width="24px"
			/>

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
			<origam-menu
					ref="origamMenuRef"
					v-model="menu"
					:close-on-content-click="false"
					:disabled="menuDisabled"
					:location="BLOCK.BOTTOM"
					:open-on-click="false"
					activator="parent"
					content-class="origam-color-picker-field__content"
					v-bind="{ ...menuProps }"
					@after-leave="handleAfterLeave"
			>

				<template #default>
					<origam-color-picker
							ref="origamColorPickerRef"
							:model-value="model"
							v-bind="{...colorPickerProps}"
							@update:model-value="handleSelectColor"
					/>
				</template>
			</origam-menu>

			<template v-if="selectedValue">
					<span class="origam-color-picker-field__selection-text">
            <slot name="colorSelection">
              {{ selectedValue }}
            </slot>
          </span>
			</template>
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

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>
	</origam-text-field>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamColorPicker, OrigamMenu, OrigamSheet, OrigamTextField, OrigamTranslateScale } from "../../components"

	import { useLocale, useProps, useVModel } from "../../composables"

	import { COLOR_NULL, ORIGAM_FORM_KEY } from "../../consts"

	import { BLOCK, DENSITY, DIRECTION, TEXT_FIELD_TYPE } from "../../enums"

	import type { IColorPickerFieldProps } from "../../interfaces"

	import type { TColor, TOrigamColorPicker, TOrigamMenu, TOrigamTextField, TTransitionProps } from "../../types"

	import { forwardRefs, HSVtoCSS, matchesSelector } from "../../utils"

	import { computed, inject, nextTick, ref, shallowRef, StyleValue, useSlots, watch } from "vue"

	const props = withDefaults(defineProps<IColorPickerFieldProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		border: true,
		rounded: true,
		modelValue: null,
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps,
		closeText: 'origam.close',
		openText: 'origam.open',
		closeOnSelect: false
	})

	const {filterProps} = useProps<IColorPickerFieldProps>(props)

	const {t} = useLocale()

	const origamTextFieldRef = ref<TOrigamTextField>()
	const origamMenuRef = ref<TOrigamMenu>()
	const origamColorPickerRef = ref<TOrigamColorPicker>()

	const slots = useSlots()

	const model = useVModel(
			props,
			'modelValue',
			COLOR_NULL
	)

	const handleSelectColor = (color: TColor) => {
		model.value = color

		nextTick(() => {
			if (props.closeOnSelect) {
				menu.value = false
			}
		})
	}

	const selectedValue = computed(() => {
		return model.value
	})

	const hasSelectedValue = computed(() => {
		return selectedValue.value !== null
	})

	const menuState = useVModel(props, 'menu')
	const menu = computed<boolean>({
		get: () => menuState.value,
		set: (v) => {
			if (menuState.value && !v && origamMenuRef.value?.openChildren) {
				return
			}

			menuState.value = v
		}
	})

	const isFocused = shallowRef(false)
	const form = inject(ORIGAM_FORM_KEY, null)

	const menuDisabled = computed(() => {
		return props.readonly || form?.isReadonly.value
	})
	const menuProps = computed(() => {
		return {
			...props.menuProps,
			activatorProps: {
				...(props.menuProps?.activatorProps || {}),
				'aria-haspopup': 'colorpickerbox' // Set aria-haspopup to 'listbox'
			}
		}
	})

	const handleClear = () => {
		model.value = COLOR_NULL

		if (props.openOnClear) {
			menu.value = true
		}
	}
	const handleMousedownControl = () => {
		if (menuDisabled.value) return

		menu.value = !menu.value
	}
	const handleBlur = (e: FocusEvent) => {
		if (!origamColorPickerRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
			menu.value = false
		}

		if (hasSelectedValue.value) {
			isFocused.value = true
		}
	}
	const handleChange = () => {
		if (matchesSelector(origamTextFieldRef.value, ':autofill') || matchesSelector(origamTextFieldRef.value, ':-webkit-autofill')) {
			// (e.target as HTMLInputElement).value
			// TODO -  Select date
		}
	}
	const handleAfterLeave = () => {
		if (isFocused.value) {
			origamTextFieldRef.value?.focus()
		}
	}

	const textFieldProps = computed(() => {
		return origamTextFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
	})

	const colorPickerProps = computed(() => {
		return origamColorPickerRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue'])
	})

	const isDirty = computed(() => {
		return model.value === COLOR_NULL
	})
	const placeholder = computed(() => {
		return isDirty.value || (!isFocused.value && props.label && !props.persistentPlaceholder) ? undefined : props.placeholder
	})
	const label = computed(() => {
		return menu.value ? props.closeText : props.openText
	})

	watch(selectedValue, () => {
		isFocused.value = hasSelectedValue.value
	}, {
		immediate: true,
		deep: true
	})

	// CLASS & STYLES

	const colorPickerFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const colorPickerFieldClasses = computed(() => {
		return [
			'origam-color-picker-field',
			{
				'origam-color-picker-field--active-menu': menu.value
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({
		filterProps,
		isFocused,
		menu
	}, origamTextFieldRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-color-picker-field {
		:deep(.origam-field) {
			--origam-field---padding-start: 0;
		}
	}
</style>
