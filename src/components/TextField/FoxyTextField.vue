<template>
	<foxy-input
			ref="foxyInputRef"
			v-model="model"
			:class="textFieldClasses"
			:focused="isFocused"
			:style="textFieldStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template v-if="hasSlot('prepend')" #prepend>
			<slot name="prepend"/>
		</template>

		<template #default="{id, isDisabled, isDirty, isValid, isReadonly}">
			<slot name="field" v-bind="{id, isDisabled, isDirty, isValid, isReadonly}">
				<foxy-field
						:id="id"
						ref="foxyFieldRef"
						:active="isActive || isDirty"
						:dirty="isDirty || props.dirty"
						:disabled="isDisabled"
						:error="isValid === false"
						:focused="isFocused"
						:role="props.role"
						v-bind="{...fieldProps}"
						@click="handleControlClick"
						@mousedown="handleControlMousedown"
						@click:clear="handleClear"
						@click:prependInner="handleClickPrependInner"
						@click:appendInner="handleClickAppendInner">
					<template v-if="hasSlot('loader')" #loader>
						<slot name="loader"/>
					</template>

					<template v-if="hasSlot('prependInner')" #prependInner>
						<slot name="prependInner"/>
					</template>

					<template #default="fieldSlotProps">
						<slot name="prefix">
							<span v-if="prefix" class="foxy-text-field__prefix">
	              <span>
	                {{ prefix }}
	              </span>
	            </span>
						</slot>

						<div
								class="foxy-text-field__field"
								data-no-activator=""
						>
							<slot name="default" v-bind="fieldSlotProps">
								<input
										ref="inputRef"
										v-intersect="intersect"
										:autofocus="props.autofocus"
										:disabled="isDisabled"
										:name="props.name"
										:placeholder="props.placeholder"
										:readonly="isReadonly"
										:size="1"
										:type="props.type"
										:value="model"
										v-bind="{ ...fieldSlotProps, ...inputAttrs }"
										@blur="handleBlur"
										@focus="handleFocus"
										@input="handleInput"
								/>
							</slot>
						</div>

						<slot name="suffix">
							<span v-if="suffix" class="foxy-text-field__suffix">
	              <span>
	                {{ suffix }}
	              </span>
	            </span>
						</slot>
					</template>

					<template v-if="hasSlot('appendInner')" #appendInner>
						<slot name="appendInner"/>
					</template>

					<template v-if="hasSlot('clear')" #clear>
						<slot name="clear"/>
					</template>
				</foxy-field>
			</slot>
		</template>

		<template v-if="hasSlot('append')" #append>
			<slot name="append"/>
		</template>

		<template v-if="hasDetails" #details="detailsSlotProps">
			<slot name="details" v-bind="detailsSlotProps">
				<foxy-counter
						:active="props.persistentCounter || isFocused"
						:disabled="props.disabled"
						:max="max"
						:value="counterValue"
				>
					<template v-if="hasSlot('counter')" #default="{counter, value, max}">
						<slot name="counter" v-bind="{counter, value, max}"/>
					</template>
				</foxy-counter>
			</slot>
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
	import { vIntersect } from "@foxy/directives"

	import { FoxyCounter, FoxyField, FoxyInput } from "@foxy/components"

	import { useAdjacentInner, useFocus, useSlots } from "@foxy/composables"

	import { ACTIVE_TEXT_FIELD_TYPE, FIELD_PROPS, INPUT_PROPS, INPUT_TEXT_FIELD_TYPE } from "@foxy/consts"

	import { DENSITY, DIRECTION, TEXT_FIELD_TYPE } from "@foxy/enums"

	import { ITextFieldProps } from "@foxy/interfaces"

	import { filterInputAttrs, keys, omit, pick, useProxiedModel } from "@foxy/utils"

	import { computed, nextTick, ref, StyleValue, useAttrs } from "vue"

	const props = withDefaults(defineProps<ITextFieldProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		clearIcon: '$clear'
	})

	const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

	const attrs = useAttrs()
	const {hasSlot} = useSlots()

	const model = useProxiedModel(props, 'modelValue')
	const {isFocused, focus, blur: handleBlur} = useFocus(props)
	const {
		clickPrependInner: handleClickPrependInner,
		clickAppendInner: handleClickAppendInner
	} = useAdjacentInner(props, emits)

	const counterValue = computed(() => {
		if (typeof props.counterValue === 'function') {
			return props.counterValue(model.value)
		}

		if (typeof props.counterValue === 'number') {
			return props.counterValue
		}

		return (model.value ?? '').toString().length
	})
	const max = computed(() => {
		if (attrs.maxlength) return attrs.maxlength as unknown as undefined

		if (!props.counter || (typeof props.counter !== 'number' && typeof props.counter !== 'string')) {
			return undefined
		}

		return props.counter
	})

	const intersect = computed(() => {
		return [{
			handler: handleIntersect
		}, null, ['once']]
	})
	const handleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[]) => {
		if (!props.autofocus || !isIntersecting) return

		(entries[0].target as HTMLInputElement)?.focus?.()
	}

	const foxyInputRef = ref()
	const foxyFieldRef = ref()
	const inputRef = ref<HTMLInputElement>()

	const isActive = computed(() => {
		return ACTIVE_TEXT_FIELD_TYPE.includes(props.type) ||
				props.persistentPlaceholder ||
				isFocused.value ||
				props.active
	})

	const handleFocus = () => {
		if (inputRef.value !== document.activeElement) {
			inputRef.value?.focus()
		}

		if (!isFocused.value) focus()
	}
	const handleControlMousedown = (e: MouseEvent) => {
		emits('mousedown:control', e)

		if (e.target === inputRef.value) return

		handleFocus()
		e.preventDefault()
	}
	const handleControlClick = (e: MouseEvent) => {
		handleFocus()

		emits('click:control', e)
	}
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()

		handleFocus()

		nextTick(() => {
			model.value = null

			emits('click:clear', e)
		})
	}
	const handleInput = (e: Event) => {
		const el = e.target as HTMLInputElement

		model.value = el.value

		if (typeof props.modelModifiers === 'string' && INPUT_TEXT_FIELD_TYPE.includes(props.type)) {
			const caretPosition = [el.selectionStart, el.selectionEnd]

			nextTick(() => {
				el.selectionStart = caretPosition[0]
				el.selectionEnd = caretPosition[1]
			})
		}
	}

	const hasCounter = computed(() => {
		return hasSlot('counter') || (props.counter !== false && props.counter != null)
	})
	const hasDetails = computed(() => {
		return hasCounter.value || hasSlot('details')
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
	const inputProps = computed(() => {
		return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'class', 'focused'])
	})
	const fieldProps = computed(() => {
		return omit(pick(props, keys(FIELD_PROPS)), ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error'])
	})

	// CLASS & STYLES

	const textFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const textFieldClasses = computed(() => {
		return [
			'foxy-text-field',
			{
				'foxy-text-field--prefixed': props.prefix,
				'foxy-text-field--suffixed': props.suffix
			},
			props.class
		]
	})
</script>
