<template>
	<div
			:class="fieldClasses"
			:style="fieldStyles"
			v-bind="$attrs"
			@click="handleClick"
	>
		<div class="foxy-field__overlay"/>

		<template v-if="hasLoading">
			<slot name="loader">
				<div class="foxy-field__loader">
					<foxy-progress
							:active="!!props.loading"
							:color="props.color"
							:indeterminate="typeof props.loading !== 'number'"
							:model-value="typeof props.loading === 'number' ? props.loading : undefined"
							:type="PROGRESS_TYPE.LINEAR"
							class="foxy-field__progress foxy-field__progress--linear"
							thickness="4"
					/>
				</div>
			</slot>
		</template>

		<div
				v-if="hasPrependInner"
				key="prependInner"
				class="foxy-field__prepend-inner"
				@click="handleClickPrependInner"
		>
			<slot name="prependInner">
				<foxy-avatar
						v-if="prependInnerAvatar"
						key="prepend-avatar"
						:density="density"
						:image="prependInnerAvatar"
				/>
				<foxy-icon
						v-if="prependInnerIcon"
						key="prepend-icon"
						:density="density"
						:icon="prependInnerIcon"
				/>
			</slot>
		</div>

		<div
				class="foxy-field__field"
				data-no-activator=""
		>
			<template v-if="hasFloatingLabel">
				<slot name="floatingLabel">
					<foxy-label
							key="floating-label"
							ref="foxyFloatingLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="foxy-field__label"
							floating
					/>
				</slot>
			</template>

			<template v-if="hasLabel">
				<slot name="label">
					<foxy-label
							ref="foxyLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="foxy-field__label"
					/>
				</slot>
			</template>

			<span
					v-if="hasPrefix"
					class="foxy-field__prefix"
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
					class="foxy-field__suffix"
			>
        <slot name="suffix">
          <span>
            {{ suffix }}
          </span>
        </slot>
      </span>
		</div>

		<foxy-expand-x
				v-if="hasClear"
				key="clear"
		>
			<div
					v-show="props.dirty"
					class="foxy-field__clearable"
					@mousedown="handleMousedownClear"
			>
				<slot name="clear">
					<foxy-icon
							:icon="props.clearIcon"
							@blur="handleBlur"
							@focus="handleFocus"
							@keydown="handleKeydownClear"
					/>
				</slot>
			</div>
		</foxy-expand-x>

		<div
				v-if="hasAppendInner"
				key="appendInner"
				class="foxy-field__append-inner"
				@click="handleClickAppendInner"
		>
			<slot name="appendInner">
				<foxy-avatar
						v-if="appendInnerAvatar"
						key="append-avatar"
						:density="density"
						:image="appendInnerAvatar"
				/>
				<foxy-icon
						v-if="appendInnerIcon"
						key="append-icon"
						:density="density"
						:icon="appendInnerIcon"
				/>
			</slot>
		</div>

		<div class="foxy-field__outline">
			<div class="v-field__outline__start"/>
			<div class="v-field__outline__end"/>
		</div>

	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyExpandX, FoxyIcon, FoxyLabel, FoxyProgress } from '@foxy/components'

	import { useAdjacentInner, useBothColor, useDensity, useFocus, useLoader, useProps, useRtl } from '@foxy/composables'

	import { KEYBOARD_VALUES } from '@foxy/consts'

	import { EASING, PROGRESS_TYPE } from '@foxy/enums'

	import type { IFieldProps } from '@foxy/interfaces'

	import type { TFoxyLabel } from "@foxy/types"

	import { animate, convertToUnit, getUid, nullifyTransforms } from '@foxy/utils'

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

	const foxyLabelRef = ref<TFoxyLabel>()
	const foxyFloatingLabelRef = ref<TFoxyLabel>()
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
			class: 'foxy-field__input',
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
			const el: HTMLElement = foxyLabelRef.value!.$el
			const targetEl: HTMLElement = foxyFloatingLabelRef.value!.$el

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
				const scale = parseFloat(targetStyle.getPropertyValue('--foxy-field__label---font-size'))
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
			'foxy-field',
			{
				'foxy-field--active': isActive.value,
				'foxy-field--appended': hasAppendInner.value,
				'foxy-field--center-affix': props.centerAffix,
				'foxy-field--disabled': props.disabled,
				'foxy-field--dirty': props.dirty,
				'foxy-field--error': props.error,
				'foxy-field--flat': props.flat,
				'foxy-field--has-background': !!props.bgColor,
				'foxy-field--persistent-clear': props.persistentClear,
				'foxy-field--prepended': hasPrependInner.value,
				'foxy-field--reverse': props.reverse,
				'foxy-field--single-line': props.singleLine,
				'foxy-field--no-label': !hasLabel.value,
				'foxy-text-field--prefixed': props.prefix,
				'foxy-text-field--suffixed': props.suffix
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
	.foxy-field {
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
		padding-inline: var(--foxy-field---padding-start) var(--foxy-field---padding-end);

		--foxy-field---padding-start: 16px;
		--foxy-field---padding-end: 16px;
		--foxy-field---padding-top: 8px;
		--foxy-field---padding-bottom: 4px;

		--foxy-field__input---padding-top: calc(var(--foxy-field---padding-top, 8px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)));
		--foxy-field__input---padding-bottom: var(--foxy-field---padding-bottom, 4px);
		--foxy-field__input---padding-start: var(--foxy-field---padding-bottom, 16px);
		--foxy-field__input---padding-end: var(--foxy-field---padding-bottom, 16px);

		.foxy-chip {
			--foxy-chip---height: 24px;
		}

		:deep(.foxy-field__input) {
			align-items: center;
			color: inherit;
			column-gap: 2px;
			display: flex;
			flex-wrap: wrap;
			letter-spacing: 0.009375em;
			opacity: 0.7;
			min-height: max(calc(var(--foxy-input__control---height, 56px) + var(--foxy-input---density, 0px)), 1.5rem + var(--foxy-field__input---padding-top) + var(--foxy-field__input---padding-bottom));
			min-width: 0;
			padding-inline: var(--foxy-field__input---padding-start) var(--foxy-field__input---padding-end);
			padding-top: var(--foxy-field__input---padding-top);
			padding-bottom: var(--foxy-field__input---padding-bottom);
			position: relative;
			width: 100%;
			row-gap: calc(8px - var(--foxy-input---density, 0));

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
			min-height: max(56px, 1.5rem + var(--foxy-field-input---padding-top, 0px) + var(--foxy-field-input---padding-bottom, 0px));
			padding-top: calc(var(--foxy-field---padding-top, 4px) + calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density, 0px)));
			padding-bottom: var(--foxy-field---padding-bottom, 6px);
		}

		&__prefix {
			padding-inline-start: var(--foxy-field---padding-start, 16px);
		}

		&__suffix {
			padding-inline-end: var(--foxy-field---padding-end, 16px);
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
			padding-top: var(--foxy-input---padding-top, 8px);
			padding-inline: var(--foxy-field---padding-start) var(--foxy-field---padding-end);

			> .foxy-icon {
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
			margin-inline-start: var(--foxy-field__input---padding-start, 0);
			margin-inline-end: var(--foxy-field__input---padding-end, 0);
			max-width: calc(100% - var(--foxy-field__input---padding-start, 0) - var(--foxy-field__input---padding-end, 0));
			pointer-events: none;
			position: absolute;
			top: calc(var(--foxy-input---padding-top, 16px) + var(--foxy-input---density) - 8px);
			transform-origin: left center;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform;
			z-index: 1;

			&.foxy-label--floating {
				font-size: var(--foxy-field__label---font-size);
				visibility: hidden;
				max-width: 100%;
			}
		}

		&--prefixed {
			--foxy-field---padding-start: 6px;
		}

		&--suffixed {
			--foxy-field---padding-end: 6px;
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

				&.foxy-label--floating {
					transform: none;
					top: calc(var(--foxy-input---padding-top, 16px) / 2 + var(--foxy-input---density, 0px));
				}
			}
		}

		&--active {
			#{$this}__label {
				visibility: hidden;

				&.foxy-label--floating {
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
			--foxy-field---padding-start: 6px;
		}

		&--appended {
			--foxy-field---padding-end: 6px;
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
				> .foxy-icon {
					opacity: 1;
				}
			}
		}

		&--error {
			&:not(#{$this}--disabled) {
				#{$this}__append-inner,
				#{$this}__clearable,
				#{$this}__prepend-inner {
					> .foxy-icon {
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
		--foxy-field__label---font-size: 0.75em;
	}
</style>
