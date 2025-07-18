<template>
	<div
			:class="fieldClasses"
			:style="fieldStyles"
			v-bind="$attrs"
			@click="handleClick"
	>
		<div class="foxui-field__overlay"/>

		<template v-if="hasLoading">
			<slot name="loader">
				<div class="foxui-field__loader">
					<foxui-progress
							:active="!!props.loading"
							:color="props.color"
							:indeterminate="typeof props.loading !== 'number'"
							:model-value="typeof props.loading === 'number' ? props.loading : undefined"
							:type="PROGRESS_TYPE.LINEAR"
							class="foxui-field__progress foxui-field__progress--linear"
							thickness="4"
					/>
				</div>
			</slot>
		</template>

		<div
				v-if="hasPrependInner"
				key="prependInner"
				class="foxui-field__prepend-inner"
				@click="handleClickPrependInner"
		>
			<slot name="prependInner">
				<foxui-avatar
						v-if="prependInnerAvatar"
						key="prepend-avatar"
						:density="density"
						:image="prependInnerAvatar"
				/>
				<foxui-icon
						v-if="prependInnerIcon"
						key="prepend-icon"
						:density="density"
						:icon="prependInnerIcon"
				/>
			</slot>
		</div>

		<div
				class="foxui-field__field"
				data-no-activator=""
		>
			<template v-if="hasFloatingLabel">
				<slot name="floatingLabel">
					<foxui-label
							key="floating-label"
							ref="foxuiFloatingLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="foxui-field__label"
							floating
					/>
				</slot>
			</template>

			<template v-if="hasLabel">
				<slot name="label">
					<foxui-label
							ref="foxuiLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="foxui-field__label"
					/>
				</slot>
			</template>

			<span
					v-if="hasPrefix"
					class="foxui-field__prefix"
			>
         <slot name="prefix">
          <span>
            {{ prefix }}
          </span>
         </slot>
      </span>

			<slot
					name="default"
					v-bind="slotProps"
			/>

			<span
					v-if="hasSuffix"
					class="foxui-field__suffix"
			>
        <slot name="suffix">
          <span>
            {{ suffix }}
          </span>
        </slot>
      </span>
		</div>

		<foxui-expand-x
				v-if="hasClear"
				key="clear"
		>
			<div
					v-show="props.dirty"
					class="foxui-field__clearable"
					@mousedown="handleMousedownClear"
			>
				<slot name="clear">
					<foxui-icon
							:icon="props.clearIcon"
							@blur="handleBlur"
							@focus="handleFocus"
							@keydown="handleKeydownClear"
					/>
				</slot>
			</div>
		</foxui-expand-x>

		<div
				v-if="hasAppendInner"
				key="appendInner"
				class="foxui-field__append-inner"
				@click="handleClickAppendInner"
		>
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
		</div>

		<div class="foxui-field__outline">
			<div class="v-field__outline__start"/>
			<div class="v-field__outline__end"/>
		</div>

	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiAvatar, FoxuiExpandX, FoxuiIcon, FoxuiLabel, FoxuiProgress } from '@foxui/components'

	import { useAdjacentInner, useBothColor, useDensity, useFocus, useLoader, useProps, useRtl } from '@foxui/composables'

	import { EASING, KEYBOARD_VALUES, PROGRESS_TYPE } from '@foxui/enums'

	import type { IFieldProps } from '@foxui/interfaces'

	import type { TFoxuiLabel } from "@foxui/types"

	import { animate, convertToUnit, getUid, nullifyTransforms } from '@foxui/utils'

	import { computed, ref, StyleValue, useSlots, watch } from 'vue'

	const props = withDefaults(defineProps<IFieldProps>(), {})

	defineEmits(['update:focused', 'update:modelValue', 'click:appendInner', 'click:prependInner', 'click:clear'])

	const {filterProps} = useProps<IFieldProps>(props)

	const {loaderClasses} = useLoader(props)
	const {densityClasses} = useDensity(props)
	const {rtlClasses} = useRtl()

	const {focusClasses, isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const {
		hasAppendInner,
		onClickAppendInner: handleClickAppendInner,
		onClickPrependInner: handleClickPrependInner,
		clickClear: handleClickClear,
		hasPrependInner,
		hasClear
	} = useAdjacentInner(props)

	const uid = getUid()
	const id = computed(() => props.id || `input-${uid}`)
	const messagesId = computed(() => `${id.value}-messages`)

	const foxuiLabelRef = ref<TFoxuiLabel>()
	const foxuiFloatingLabelRef = ref<TFoxuiLabel>()
	const controlRef = ref<HTMLElement>()

	const currentColor = computed(() => {
		return props.error || props.disabled ? undefined
				: isActive.value && isFocused.value && props.activeColor ? props.activeColor
						: props.color
	})
	const currentBgColor = computed(() => {
		return props.error || props.disabled ? undefined
				: isActive.value && isFocused.value && props.activeBgColor ? props.activeBgColor
						: props.bgColor
	})

	const {colorStyles} = useBothColor(currentBgColor, currentColor)

	const handleClick = (e: MouseEvent) => {
		if (e.target !== document.activeElement) {
			e.preventDefault()
		}
	}
	const handleKeydownClear = (e: KeyboardEvent) => {
		if (e.key !== KEYBOARD_VALUES.ENTER && e.key !== ' ') return

		e.preventDefault()
		e.stopPropagation()

		handleClickClear(new MouseEvent('click'))
	}
	const handleMousedownClear = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		handleClickClear(e)
	}

	const slotProps = computed(() => {
		return {
			class: 'foxui-field__input',
			id: id.value,
			'aria-describedby': messagesId.value,
			isActive: isActive.value,
			isFocused: isFocused.value,
			controlRef: controlRef.value,
			onBlur: handleBlur,
			onFocus: handleFocus
		}
	})

	const slots = useSlots()
	const hasFloatingLabel = computed(() => {
		return !props.singleLine && !!(props.label || slots.floatingLabel)
	})
	const hasLabel = computed(() => {
		return !props.singleLine && !!(props.label || slots.label)
	})
	const hasLoading = computed(() => {
		return slots.loader || !!props.loading
	})
	const hasPrefix = computed(() => {
		return !!props.prefix
	})
	const hasSuffix = computed(() => {
		return !!props.suffix
	})

	const isActive = computed(() => {
		return props.dirty || props.active || hasPrefix.value || hasSuffix.value
	})
	watch(isActive, (newVal, oldVal) => {
		if (hasLabel.value && newVal !== oldVal) {
			const el: HTMLElement = foxuiLabelRef.value!.$el
			const targetEl: HTMLElement = foxuiFloatingLabelRef.value!.$el

			requestAnimationFrame(() => {
				const rect = nullifyTransforms(el)
				const targetRect = targetEl.getBoundingClientRect()

				const x = targetRect.x - rect.x
				const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

				const targetWidth = targetRect.width / 0.75
				const width = Math.abs(targetWidth - rect.width) > 1
						? {maxWidth: convertToUnit(targetWidth)}
						: undefined

				const style = getComputedStyle(el)
				const targetStyle = getComputedStyle(targetEl)
				const duration = parseFloat(style.transitionDuration) * 1000 || 150
				const scale = parseFloat(targetStyle.getPropertyValue('--foxui-field__label---font-size'))
				const color = targetStyle.getPropertyValue('color')

				el.style.visibility = 'visible'
				targetEl.style.visibility = 'hidden'

				animate(el, {
					transform: `translate(${x}px, ${y}px) scale(${scale})`,
					color,
					...width
				}, {
					duration,
					easing: EASING.STANDARD,
					direction: newVal ? 'normal' : 'reverse'
				}).finished.then(() => {
					el.style.removeProperty('visibility')
					targetEl.style.removeProperty('visibility')
				})
			})
		}
	}, {flush: 'post'})

	// CLASS & STYLES

	const fieldStyles = computed(() => {
		return [
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const fieldClasses = computed(() => {
		return [
			'foxui-field',
			{
				'foxui-field--active': isActive.value,
				'foxui-field--appended': hasAppendInner.value,
				'foxui-field--center-affix': props.centerAffix,
				'foxui-field--disabled': props.disabled,
				'foxui-field--dirty': props.dirty,
				'foxui-field--error': props.error,
				'foxui-field--flat': props.flat,
				'foxui-field--has-background': !!props.bgColor,
				'foxui-field--persistent-clear': props.persistentClear,
				'foxui-field--prepended': hasPrependInner.value,
				'foxui-field--reverse': props.reverse,
				'foxui-field--single-line': props.singleLine,
				'foxui-field--no-label': !hasLabel.value,
				'foxui-text-field--prefixed': props.prefix,
				'foxui-text-field--suffixed': props.suffix
			},
			rtlClasses.value,
			loaderClasses.value,
			densityClasses.value,
			focusClasses.value,
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
	.foxui-field {
		$this: &;

		display: grid;
		grid-template-areas: "prepend-inner field clear append-inner";
		grid-template-columns: min-content minmax(0, 1fr) min-content min-content;
		font-size: 16px;
		letter-spacing: 0.009375em;
		max-width: 100%;
		border-radius: 4px;
		contain: layout;
		flex: 1 0;
		grid-area: control;
		position: relative;
		padding-inline: var(--foxui-field---padding-start) var(--foxui-field---padding-end);

		--foxui-field---padding-start: 16px;
		--foxui-field---padding-end: 16px;
		--foxui-field---padding-top: 8px;
		--foxui-field---padding-bottom: 4px;

		--foxui-field__input---padding-top: calc(var(--foxui-field---padding-top, 8px) + calc(var(--foxui-input---padding-top, 16px) + var(--foxui-input---density, 0px)));
		--foxui-field__input---padding-bottom: var(--foxui-field---padding-bottom, 4px);
		--foxui-field__input---padding-start: var(--foxui-field---padding-bottom, 16px);
		--foxui-field__input---padding-end: var(--foxui-field---padding-bottom, 16px);

		.foxui-chip {
			--foxui-chip---height: 24px;
		}

		:deep(.foxui-field__input) {
			align-items: center;
			color: inherit;
			column-gap: 2px;
			display: flex;
			flex-wrap: wrap;
			letter-spacing: 0.009375em;
			opacity: 0.7;
			min-height: max(calc(var(--foxui-input__control---height, 56px) + var(--foxui-input---density, 0px)), 1.5rem + var(--foxui-field__input---padding-top) + var(--foxui-field__input---padding-bottom));
			min-width: 0;
			padding-inline: var(--foxui-field__input---padding-start) var(--foxui-field__input---padding-end);
			padding-top: var(--foxui-field__input---padding-top);
			padding-bottom: var(--foxui-field__input---padding-bottom);
			position: relative;
			width: 100%;
			row-gap: calc(8px - var(--foxui-input---density, 0));

			input,
			textarea {
				letter-spacing: inherit;
				border: none;

				&::placeholder {
					color: currentColor;
					opacity: 0.5;
				}

				&:focus,
				&:active {
					outline: none;
				}

				&:invalid {
					box-shadow: none;
				}
			}
		}

		&__prefix,
		&__suffix {
			align-items: center;
			color: currentColor;
			cursor: default;
			display: flex;
			opacity: 0;
			transition: inherit;
			white-space: nowrap;
			min-height: max(56px, 1.5rem + var(--foxui-field-input---padding-top, 0px) + var(--foxui-field-input---padding-bottom, 0px));
			padding-top: calc(var(--foxui-field---padding-top, 4px) + calc(var(--foxui-input---padding-top, 16px) + var(--foxui-input---density, 0px)));
			padding-bottom: var(--foxui-field---padding-bottom, 6px);
		}

		&__prefix {
			padding-inline-start: var(--foxui-field---padding-start, 16px);
		}

		&__suffix {
			padding-inline-end: var(--foxui-field---padding-end, 16px);
		}

		&__field {
			flex: 1 0;
			grid-area: field;
			position: relative;
			align-items: flex-start;
			display: flex;
		}

		&__prepend-inner {
			grid-area: prepend-inner;
		}

		&__clearable {
			grid-area: clear;
		}

		&__append-inner {
			grid-area: append-inner;
		}

		&__append-inner,
		&__clearable,
		&__prepend-inner {
			display: flex;
			align-items: flex-start;
			padding-top: var(--foxui-input---padding-top, 8px);
			padding-inline: var(--foxui-field---padding-start) var(--foxui-field---padding-end);

			> .foxui-icon {
				opacity: 0.7;
			}
		}

		&__clearable {
			cursor: pointer;
			opacity: 0;
			overflow: hidden;
			margin-inline: 4px;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform, width;
		}

		&__label {
			contain: layout paint;
			display: block;
			margin-inline-start: var(--foxui-field__input---padding-start, 0);
			margin-inline-end: var(--foxui-field__input---padding-end, 0);
			max-width: calc(100% - var(--foxui-field__input---padding-start, 0) - var(--foxui-field__input---padding-end, 0));
			pointer-events: none;
			position: absolute;
			top: calc(var(--foxui-input---padding-top, 16px) + var(--foxui-input---density) - 8px);
			transform-origin: left center;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform;
			z-index: 1;

			&.foxui-label--floating {
				font-size: var(--foxui-field__label---font-size);
				visibility: hidden;
				max-width: 100%;
			}
		}

		&--prefixed {
			--foxui-field---padding-start: 6px;
		}

		&--suffixed {
			--foxui-field---padding-end: 6px;
		}

		&--center-affix {
			#{$this}__append-inner,
			#{$this}__clearable,
			#{$this}__prepend-inner {
				align-items: center;
				padding-top: 0;
			}

			#{$this}__label {
				top: 50%;
				transform: translateY(-50%);

				&.foxui-label--floating {
					transform: none;
					top: calc(var(--foxui-input---padding-top, 16px) / 2 + var(--foxui-input---density, 0px));
				}
			}
		}

		&--active {
			#{$this}__label {
				visibility: hidden;

				&.foxui-label--floating {
					visibility: unset;
				}
			}

			#{$this}__prefix,
			#{$this}__suffix {
				opacity: 1;
			}
		}

		&--disabled {
			opacity: 0.5;
			pointer-events: none;

			#{$this}__prefix,
			#{$this}__suffix {
				color: currentColor;
			}
		}

		&--prepended {
			--foxui-field---padding-start: 6px;
		}

		&--appended {
			--foxui-field---padding-end: 6px;
		}

		&--rounded {
			border-radius: 24px;
		}

		&--focused {
			#{$this}__append-inner,
			#{$this}__prepend-inner {
				opacity: 1;
			}

			#{$this}__label {
				opacity: 1;
			}
		}

		&--disabled,
		&--error {
			#{$this}__append-inner,
			#{$this}__clearable,
			#{$this}__prepend-inner {
				> .foxui-icon {
					opacity: 1;
				}
			}
		}

		&--error {
			&:not(#{$this}--disabled) {
				#{$this}__append-inner,
				#{$this}__clearable,
				#{$this}__prepend-inner {
					> .foxui-icon {
						color: rgba(255, 0, 0, 1);
					}
				}

				#{$this}__label {
					color: rgba(255, 0, 0, 1);
				}
			}
		}

		&--focused,
		&--persistent-clear {
			#{$this}__clearable {
				opacity: 1;
			}
		}

		&--no-label,
		&--active {
			input {
				opacity: 1;
			}
		}

		&--single-line {
			input {
				transition: none;
			}
		}

		@media (hover: hover) {
			&:hover {
				#{$this}__clearable {
					opacity: 1;
				}
			}
		}

		@media (hover: none) {
			#{$this}__clearable {
				opacity: 1;
			}
		}
	}
</style>

<style>
	:root {
		--foxui-field__label---font-size: 0.75em;
	}
</style>
