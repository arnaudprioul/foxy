<template>
	<foxy-text-field
			ref="foxyTextFieldRef"
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
				v-if="hasSlot('prepend')"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template
				v-if="hasSlot('loader')"
				#loader
		>
			<slot name="loader"/>
		</template>

		<template
				#prependInner
		>
			<foxy-sheet
					:bg-color="selectedValue ?? HSVtoCSS(COLOR_NULL)"
					height="100%"
					min-width="24px"
			/>

			<slot name="prependInner"/>
		</template>

		<template
				v-if="hasSlot('floatingLabel')"
				#floatingLabel
		>
			<slot name="floatingLabel"/>
		</template>

		<template
				v-if="hasSlot('label')"
				#label
		>
			<slot name="label"/>
		</template>

		<template
				v-if="hasSlot('prefix')"
				#prefix
		>
			<slot name="prefix"/>
		</template>

		<template #default>
			<foxy-menu
					ref="foxyMenuRef"
					v-model="menu"
					:close-on-content-click="false"
					:disabled="menuDisabled"
					:location="BLOCK.BOTTOM"
					:open-on-click="false"
					activator="parent"
					content-class="foxy-color-picker-field__content"
					v-bind="{ ...menuProps }"
					@after-leave="handleAfterLeave"
			>

				<template #default>
					<foxy-color-picker
							ref="foxyColorPickerRef"
							:model-value="model"
							v-bind="{...colorPickerProps}"
							@update:model-value="handleSelectColor"
					/>
				</template>
			</foxy-menu>

			<template v-if="selectedValue">
					<span class="foxy-color-picker-field__selection-text">
            <slot name="colorSelection">
              {{ selectedValue }}
            </slot>
          </span>
			</template>
		</template>

		<template
				v-if="hasSlot('suffix')"
				#suffix
		>
			<slot name="suffix"/>
		</template>

		<template
				v-if="hasSlot('appendInner')"
				#appendInner
		>
			<slot name="appendInner"/>
		</template>

		<template
				v-if="hasSlot('clear')"
				#clear
		>
			<slot name="clear"/>
		</template>

		<template
				v-if="hasSlot('append')"
				#append
		>
			<slot name="append"/>
		</template>
	</foxy-text-field>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyColorPicker, FoxyMenu, FoxySheet, FoxyTextField, FoxyTranslateScale } from "@foxy/components"

	import { useLocale, useProps, useSlots, useVModel } from "@foxy/composables"

	import { COLOR_NULL, FOXY_FORM_KEY } from "@foxy/consts"

	import { BLOCK, DENSITY, DIRECTION, TEXT_FIELD_TYPE } from "@foxy/enums"

	import { IColorPickerFieldProps } from "@foxy/interfaces"

	import { TColor, TFoxyColorPicker, TFoxyMenu, TFoxyTextField } from "@foxy/types"

	import { forwardRefs, HexToHSV, HSVtoCSS, matchesSelector } from "@foxy/utils"

	import { computed, inject, nextTick, ref, shallowRef, StyleValue, watch } from "vue"

	const props = withDefaults(defineProps<IColorPickerFieldProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		border: true,
		rounded: true,
		modelValue: null,
		transition: {component: FoxyTranslateScale},
		closeText: 'foxy.close',
		openText: 'foxy.open',
		closeOnSelect: false
	})

	const {filterProps} = useProps<IColorPickerFieldProps>(props)

	const {t} = useLocale()

	const foxyTextFieldRef = ref<TFoxyTextField>()
	const foxyMenuRef = ref<TFoxyMenu>()
	const foxyColorPickerRef = ref<TFoxyColorPicker>()

	const {hasSlot} = useSlots()

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
			if (menuState.value && !v && foxyMenuRef.value?.openChildren) {
				return
			}

			menuState.value = v
		}
	})

	const isFocused = shallowRef(false)
	const form = inject(FOXY_FORM_KEY, null)

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

	const handleClear = (_e: MouseEvent) => {
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
		if (!foxyColorPickerRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
			menu.value = false
		}

		if (hasSelectedValue.value) {
			isFocused.value = true
		}
	}
	const handleChange = (e: Event) => {
		if (matchesSelector(foxyTextFieldRef.value, ':autofill') || matchesSelector(foxyTextFieldRef.value, ':-webkit-autofill')) {
			// (e.target as HTMLInputElement).value
			// TODO -  Select date
		}
	}
	const handleAfterLeave = () => {
		if (isFocused.value) {
			foxyTextFieldRef.value?.focus()
		}
	}

	const textFieldProps = computed(() => {
		return foxyTextFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
	})

	const colorPickerProps = computed(() => {
		return foxyColorPickerRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue'])
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
			'foxy-color-picker-field',
			{
				'foxy-color-picker-field--active-menu': menu.value
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({
		filterProps,
		isFocused,
		menu
	}, foxyTextFieldRef))
</script>

<style
		lang="scss"
		scoped
>
.foxy-color-picker-field {
	:deep(.foxy-field) {
		--foxy-field---padding-start: 0;
	}
}
</style>
