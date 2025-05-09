<template>
	<foxy-input
			ref="foxyInputRef"
			v-model="model"
			:class="passwordFieldClasses"
			:focused="isFocused"
			:style="passwordFieldStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id, isDisabled, isDirty, isValid, isReadonly}">
			<slot
					name="field"
					v-bind="{id, isDisabled, isDirty, isValid, isReadonly}"
			>
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
						@click:prepend-inner="handleClickPrependInner"
						@click:append-inner="handleClickAppendInner"
				>
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

					<template #default="{class: fieldSlotClass, ...fieldSlotProps}">
						<div
								:class="fieldSlotClass"
								data-no-activator=""
						>
							<slot
									name="default"
									v-bind="fieldSlotProps"
							/>
							<input
									ref="inputRef"
									v-intersect="intersect"
									:autofocus="props.autofocus"
									:disabled="isDisabled"
									:name="props.name"
									:placeholder="props.placeholder"
									:readonly="isReadonly"
									:size="1"
									:type="currentType"
									:value="model"
									v-bind="{ ...fieldSlotProps, ...inputAttrs }"
									@blur="handleBlur"
									@focus="handleFocus"
									@input="handleInput"
							>
						</div>
					</template>

					<template
							v-if="slots.suffix"
							#suffix
					>
						<slot name="suffix"/>
					</template>

					<template #appendInner>
						<div
								class="foxy-password-field__toggle-icon"
								@mousedown="handleToggleShow"
						>
							<slot
									name="appendInner"
									v-bind="{icon: currentIcon}"
							>
								<foxy-icon
										:key="currentIcon"
										:icon="currentIcon"
								/>
							</slot>
						</div>
					</template>

					<template
							v-if="slots.clear"
							#clear
					>
						<slot name="clear"/>
					</template>
				</foxy-field>
			</slot>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="hasDetails"
				#details="detailsSlotProps"
		>
			<slot
					name="details"
					v-bind="detailsSlotProps"
			>
				<foxy-counter
						:active="props.persistentCounter || isFocused"
						:disabled="props.disabled"
						:max="max"
						:value="counterValue"
				>
					<template
							v-if="slots.counter"
							#default="{counter, value, max}"
					>
						<slot
								name="counter"
								v-bind="{counter, value, max}"
						/>
					</template>
				</foxy-counter>
			</slot>
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
	</foxy-input>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyCounter, FoxyField, FoxyIcon, FoxyInput } from '@foxy/components'
	import { useAdjacentInner, useFocus, useProps, useVModel } from '@foxy/composables'
	import { vIntersect } from '@foxy/directives'
	import { DENSITY, DIRECTION, MDI_ICONS, TEXT_FIELD_TYPE } from '@foxy/enums'
	import type { IPasswordFieldProps } from '@foxy/interfaces'
	import type { TFoxyField, TFoxyInput } from "@foxy/types"
	import { filterInputAttrs, forwardRefs } from '@foxy/utils'

	import { computed, nextTick, ref, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<IPasswordFieldProps>(), {
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		offIcon: MDI_ICONS.EYE_OFF_OUTLINE,
		onIcon: MDI_ICONS.EYE_OUTLINE,
		border: true,
		rounded: true
	})

	const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

	const {filterProps} = useProps<IPasswordFieldProps>(props)

	const attrs = useAttrs()
	const slots = useSlots()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
	const {
		onClickPrependInner: handleClickPrependInner,
		onClickAppendInner: handleClickAppendInner
	} = useAdjacentInner(props)

	const show = ref(false)
	const currentIcon = computed(() => {
		return show.value ? props.offIcon : props.onIcon
	})
	const currentType = computed(() => {
		return show.value ? TEXT_FIELD_TYPE.TEXT : TEXT_FIELD_TYPE.PASSWORD
	})
	const handleToggleShow = () => {
		show.value = !show.value
	}

	const counterValue = computed(() => {
		if (typeof props.counterValue === 'function') {
			return props.counterValue(model.value)
		}

		if (props.counterValue) {
			return props.counterValue
		}

		return (model.value ?? '').toString().length
	})
	const max = computed(() => {
		if (props.maxlength) return props.maxlength as unknown as undefined

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

	const foxyInputRef = ref<TFoxyInput>()
	const foxyFieldRef = ref<TFoxyField>()
	const inputRef = ref<HTMLInputElement>()

	const isActive = computed(() => {
		return props.persistentPlaceholder || isFocused.value || props.active
	})

	const handleFocus = () => {
		nextTick(() => {
			const input: HTMLInputElement | undefined = inputRef.value

			if (input && input !== document.activeElement) {
				input.focus()
			}
		})

		if (!isFocused.value) onFocus()
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
	}

	const hasCounter = computed(() => {
		return slots.counter || (props.counter !== false && props.counter != null)
	})
	const hasDetails = computed(() => {
		return hasCounter.value || slots.details
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
	const inputProps = computed(() => {
		return foxyInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const fieldProps = computed(() => {
		return foxyFieldRef.value?.filterProps(props, ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error', 'style'])
	})

	// CLASS & STYLES

	const passwordFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const passwordFieldClasses = computed(() => {
		return [
			'foxy-password-field',
			props.class
		]
	})

	defineExpose(forwardRefs({filterProps}, foxyInputRef, foxyFieldRef, inputRef))
</script>

<style
		lang="scss"
		scoped
>
	.foxy-password-field {
		$this: &;

		input {
			color: inherit;
			opacity: 0;
			flex: 1;
			transition: 0.15s opacity cubic-bezier(0.4, 0, 0.2, 1);
			min-width: 0;

			&:focus,
			&:active {
				outline: none;
			}

			&:invalid {
				box-shadow: none;
			}
		}

		&__toggle-icon {
			cursor: pointer;
		}

		&__details {
			padding-inline: 16px;
		}

		:deep(.foxy-field) {
			&.foxy-field--no-label,
			&.foxy-field--active {
				input {
					opacity: 1;
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
