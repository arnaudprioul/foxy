<template>
	<origam-input
			ref="origamInputRef"
			v-model="model"
			:center-affix="isUniqueRow"
			:class="textareaFieldClasses"
			:focused="isFocused"
			:style="textareaFieldStyles"
			v-bind="{ ...rootAttrs, ...inputProps }"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id, isDisabled, isDirty, isReadonly, isValid}">
			<origam-field
					:id="id"
					ref="origamFieldRef"
					:active="isActive || isDirty"
					:center-affix="isUniqueRow"
					:dirty="isDirty || dirty"
					:disabled="isDisabled"
					:error="isValid === false"
					:focused="isFocused"
					:style="textareaFieldFieldStyles"
					v-bind="{ ...fieldProps }"
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
						<textarea
								ref="textareaRef"
								v-intersect="intersect"
								:autofocus="autofocus"
								:disabled="isDisabled"
								:name="name"
								:placeholder="placeholder"
								:readonly="isReadonly"
								:rows="rows"
								:value="model"
								v-bind="{ ...fieldSlotProps, ...inputAttrs }"
								@blur="handleBlur"
								@focus="handleFocus"
								@input="handleInput"
						/>
					</div>
					<div
							v-if="!autoGrow"
							ref="verticalDragger"
							class="origam-textarea-field__grip"
					>
						<svg
								aria-hidden="true"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								role="img"
								viewBox="0 0 24 24"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<path
									d="M21 11H3V9h18zm0 2H3v2h18z"
									fill="currentColor"
							></path>
						</svg>
					</div>
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
				<origam-counter
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
				</origam-counter>
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
	</origam-input>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		nextTick,
		onBeforeUnmount,
		ref,
		shallowRef,
		StyleValue,
		useAttrs,
		useSlots,
		watch,
		watchEffect
	} from 'vue'
	import { OrigamCounter, OrigamField, OrigamInput } from '../../components'

	import { useAdjacentInner, useDragResizer, useFocus, useProps, useVModel } from '../../composables'

	import { vIntersect } from '../../directives'

	import { AXIS, DENSITY, MDI_ICONS } from '../../enums'

	import type { ITextareaFieldProps } from '../../interfaces'

	import type { TOrigamField, TOrigamInput } from '../../types'

	import { clamp, convertToUnit, filterInputAttrs } from '../../utils'

	const props = withDefaults(defineProps<ITextareaFieldProps>(), {
		density: DENSITY.DEFAULT,
		clearIcon: MDI_ICONS.CLOSE_CIRCLE_OUTLINE,
		border: true,
		rounded: true,
		rows: 3
	})

	const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:clear', 'click:prepend', 'click:append', 'click:appendInner', 'click:prependInner'])

	const {filterProps} = useProps<ITextareaFieldProps>(props)

	const attrs = useAttrs()
	const slots = useSlots()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
	const {
		onClickAppendInner: handleClickAppendInner,
		onClickPrependInner: handleClickPrependInner
	} = useAdjacentInner(props)

	const counterValue = computed(() => {
		return typeof props.counterValue === 'function'
				? props.counterValue(model.value)
				: (model.value || '').toString().length
	})
	const max = computed(() => {
		if (attrs.maxlength) return attrs.maxlength as string | number

		if (
				!props.counter ||
				(typeof props.counter !== 'number' &&
						typeof props.counter !== 'string')
		) return undefined

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

	const origamInputRef = ref<TOrigamInput>()
	const origamFieldRef = ref<TOrigamField>()
	const textareaRef = ref<HTMLTextAreaElement>()
	const verticalDragger = ref<HTMLElement>()

	const isActive = computed(() => {
		return props.persistentPlaceholder || isFocused.value || props.active
	})

	const focus = () => {
		if (textareaRef.value !== document.activeElement) {
			textareaRef.value?.focus()
		}

		if (!isFocused.value) onFocus()
	}
	const handleControlClick = (e: MouseEvent) => {
		focus()

		emits('click:control', e)
	}
	const handleControlMousedown = (e: MouseEvent) => {
		emits('mousedown:control', e)
	}
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()

		focus()

		nextTick(() => {
			model.value = ''

			emits('click:clear', e)
		})
	}
	const handleInput = (e: Event) => {
		const el = e.target as HTMLTextAreaElement

		model.value = el.value

		if (typeof props.modelModifiers !== 'boolean' && props.modelModifiers?.trim) {
			const caretPosition = [el.selectionStart, el.selectionEnd]

			nextTick(() => {
				el.selectionStart = caretPosition[0]
				el.selectionEnd = caretPosition[1]
			})
		}
	}
	const handleFocus = () => {
		focus()
	}

	const rows = ref(+props.rows)

	const isUniqueRow = computed(() => {
		return rows.value === 1
	})

	watchEffect(() => {
		if (!props.autoGrow) rows.value = +props.rows
	})

	const minHeight = computed(() => {
		if (!textareaRef.value || !origamFieldRef.value) return 0

		const style = getComputedStyle(textareaRef.value)
		const fieldStyle = getComputedStyle(origamFieldRef.value.$el)

		const padding = parseFloat(style.getPropertyValue('--origam-field---padding-top')) +
				parseFloat(style.getPropertyValue('--origam-input---padding-top')) +
				parseFloat(style.getPropertyValue('--origam-field---padding-bottom'))

		const lineHeight = parseFloat(style.lineHeight)

		return Math.max(
				parseFloat(props.rows) * lineHeight + padding,
				parseFloat(fieldStyle.getPropertyValue('--origam-input__control---height'))
		)
	})
	const maxHeight = computed(() => {
		if (!textareaRef.value) return 0

		const style = getComputedStyle(textareaRef.value)

		const padding = parseFloat(style.getPropertyValue('--origam-field---padding-top')) +
				parseFloat(style.getPropertyValue('--origam-input---padding-top')) +
				parseFloat(style.getPropertyValue('--origam-field---padding-bottom'))

		const lineHeight = parseFloat(style.lineHeight)

		return parseFloat(props.maxRows!) * lineHeight + padding || Infinity as number
	})
	const controlHeight = shallowRef(0)

	const calculateInputHeight = () => {
		if (!props.autoGrow) return

		nextTick(() => {
			if (!textareaRef.value) return

			const style = getComputedStyle(textareaRef.value)

			const padding = parseFloat(style.getPropertyValue('--origam-field---padding-top')) +
					parseFloat(style.getPropertyValue('--origam-input---padding-top')) +
					parseFloat(style.getPropertyValue('--origam-field---padding-bottom'))

			controlHeight.value = clamp((textareaRef.value?.scrollHeight ?? 0) + padding, minHeight.value, maxHeight.value)
		})
	}

	watch([model, () => props.maxRows, () => props.density, () => props.rows], () => {
		calculateInputHeight()
	}, {immediate: true})
	watch(minHeight, () => {
		controlHeight.value = minHeight.value
	})
	watch([verticalDragger, minHeight, maxHeight], () => {
		if (!verticalDragger.value) return

		useDragResizer(verticalDragger.value, controlHeight, minHeight.value, maxHeight.value, AXIS.Y)
	})
	watch(controlHeight, (newHeight) => {
		nextTick(() => {
			if (!textareaRef.value) return

			const style = getComputedStyle(textareaRef.value)

			const padding = parseFloat(style.getPropertyValue('--origam-field---padding-top')) +
					parseFloat(style.getPropertyValue('--origam-input---padding-top')) +
					parseFloat(style.getPropertyValue('--origam-field---padding-bottom'))
			const lineHeight = parseFloat(style.lineHeight)

			rows.value = Math.floor((newHeight - padding) / lineHeight)
		})
	})

	let observer: ResizeObserver | undefined
	watch(textareaRef, (val) => {
		if (val) {
			observer = new ResizeObserver(calculateInputHeight)
			observer.observe(textareaRef.value!)
		} else {
			observer?.disconnect()
		}
	})

	onBeforeUnmount(() => {
		observer?.disconnect()
	})

	const hasCounter = computed(() => {
		return slots.counter || props.counter || props.counterValue
	})
	const hasDetails = computed(() => {
		return hasCounter.value || slots.details
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused', 'centerAffix'])
	})

	const fieldProps = computed(() => {
		return origamFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'active', 'dirty', 'disabled', 'focused', 'error', 'centerAffix'])
	})

	// CLASS & STYLES

	const textareaFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const textareaFieldClasses = computed(() => {
		return [
			'origam-textarea-field origam-text-field',
			{
				'origam-textarea-field--prefixed': props.prefix,
				'origam-textarea-field--suffixed': props.suffix,
				'origam-text-field--prefixed': props.prefix,
				'origam-text-field--suffixed': props.suffix,
				'origam-textarea-field--auto-grow': props.autoGrow,
				'origam-textarea-field--no-resize': props.noResize || props.autoGrow
			},
			props.class
		]
	})
	const textareaFieldFieldStyles = computed(() => {
		return {
			'--origam-textarea-field__control---height': convertToUnit(controlHeight.value)
		}
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
	.origam-textarea-field {
		$this: &;

		:deep(.origam-field) {
			--origam-textarea-field__control---height: var(--origam-input__control---height);

			.origam-field__field {
				--origam-input__control---height: var(--origam-textarea-field__control---height);
			}

			.origam-field__input {
				flex: 1 1 auto;
				outline: none;
				-webkit-mask-image: linear-gradient(to bottom, transparent, transparent calc(var(--origam-field---padding-top, 0px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)) - 6px), black calc(var(--origam-field---padding-top, 0px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)) + 4px));
				mask-image: linear-gradient(to bottom, transparent, transparent calc(var(--origam-field---padding-top, 0px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)) - 6px), black calc(var(--origam-field---padding-top, 0px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)) + 4px));
			}

			&.origam-field--no-label,
			&.origam-field--active {
				textarea {
					opacity: 1;
				}
			}
		}

		:deep(textarea) {
			opacity: 0;
			flex: 1;
			min-width: 0;
			transition: 0.15s opacity cubic-bezier(0.4, 0, 0.2, 1);
			line-height: 1;

			&:focus,
			&:active {
				outline: none;
			}

			&:invalid {
				box-shadow: none;
			}
		}

		&--no-resize {
			:deep(.origam-field__input) {
				resize: none;
			}
		}

		&__grip {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			border: 1px solid #ddd;
			border-top-width: 0;
			cursor: ns-resize;
			height: 9px;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0.2;

			&:hover {
				color: currentColor;
				background-color: color-mix(in srgb, currentColor 30%, transparent)
			}
		}
	}
</style>
