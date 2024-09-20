<template>
	<foxy-input
			ref="foxyInputRef"
			v-model="model"
			:class="searchFieldClasses"
			:focused="isFocused"
			:style="searchFieldStyles"
			v-bind="{ ...rootAttrs, ...inputProps }">

	</foxy-input>
</template>

<script lang="ts" setup>

	import { FoxyInput } from "@foxy/components"
	import { useAdjacentInner, useFocus, useSlots, useVModel } from "@foxy/composables"
	import { FIELD_PROPS, INPUT_PROPS } from "@foxy/consts"

	import { ISearchFieldProps } from "@foxy/interfaces"
	import { TFoxyField, TFoxyInput } from "@foxy/types"
	import { filterInputAttrs, keys, omit, pick } from "@foxy/utils"
	import { computed, nextTick, ref, useAttrs } from "vue"

	const props = withDefaults(defineProps<ISearchFieldProps>(), {
		appendInnerIcon: '$search',
		throttler: 1000,
		autocomplete: false
	})

	const emits = defineEmits([])

	const attrs = useAttrs()
	const {hasSlot} = useSlots()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
	const {
		onClickAppendInner: handleClickAppendInner,
		onClickPrependInner: handleClickPrependInner
	} = useAdjacentInner(props, emits)

	const foxyInputRef = ref<TFoxyInput>()
	const foxyFieldRef = ref<TFoxyField>()
	const searchRef = ref<HTMLInputElement>()

	const isActive = computed(() => {
		return props.persistentPlaceholder || isFocused.value || props.active
	})

	const focus = () => {
		if (textareaRef.value !== document.activeElement) {
			textareaRef.value?.focus()
		}

		if (!isFocused.value) onFocus()
	}

	const handleInput = (e: Event) => {
		const el = e.target as HTMLTextAreaElement

		model.value = el.value
	}
	const handleFocus = (_e: FocusEvent) => {
		focus()
	}

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'class', 'focused', 'centerAffix'])
	})
	const fieldProps = computed(() => {
		return omit(pick(props, keys(FIELD_PROPS)), ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error', 'centerAffix'])
	})

</script>
