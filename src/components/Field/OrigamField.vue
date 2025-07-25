<template>
	<div
			:class="fieldClasses"
			:style="fieldStyles"
			v-bind="$attrs"
			@click="handleClick"
	>
		<div class="origam-field__overlay"/>

		<template v-if="hasLoading">
			<slot name="loader">
				<div class="origam-field__loader">
					<origam-progress
							:active="!!props.loading"
							:color="props.color"
							:indeterminate="typeof props.loading !== 'number'"
							:model-value="typeof props.loading === 'number' ? props.loading : undefined"
							:type="PROGRESS_TYPE.LINEAR"
							class="origam-field__progress origam-field__progress--linear"
							thickness="4"
					/>
				</div>
			</slot>
		</template>

		<div
				v-if="hasPrependInner"
				key="prependInner"
				class="origam-field__prepend-inner"
				@click="handleClickPrependInner"
		>
			<slot name="prependInner">
				<origam-avatar
						v-if="prependInnerAvatar"
						key="prepend-avatar"
						:density="density"
						:image="prependInnerAvatar"
				/>
				<origam-icon
						v-if="prependInnerIcon"
						key="prepend-icon"
						:density="density"
						:icon="prependInnerIcon"
				/>
			</slot>
		</div>

		<div
				class="origam-field__field"
				data-no-activator=""
		>
			<template v-if="hasFloatingLabel">
				<slot name="floatingLabel">
					<origam-label
							key="floating-label"
							ref="origamFloatingLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="origam-field__label"
							floating
					/>
				</slot>
			</template>

			<template v-if="hasLabel">
				<slot name="label">
					<origam-label
							ref="origamLabelRef"
							:for="id"
							:required="required"
							:style="colorStyles"
							:text="label"
							class="origam-field__label"
					/>
				</slot>
			</template>

			<span
					v-if="hasPrefix"
					class="origam-field__prefix"
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
					class="origam-field__suffix"
			>
        <slot name="suffix">
          <span>
            {{ suffix }}
          </span>
        </slot>
      </span>
		</div>

		<origam-expand-x
				v-if="hasClear"
				key="clear"
		>
			<div
					v-show="props.dirty"
					class="origam-field__clearable"
					@mousedown="handleMousedownClear"
			>
				<slot name="clear">
					<origam-icon
							:icon="props.clearIcon"
							@blur="handleBlur"
							@focus="handleFocus"
							@keydown="handleKeydownClear"
					/>
				</slot>
			</div>
		</origam-expand-x>

		<div
				v-if="hasAppendInner"
				key="appendInner"
				class="origam-field__append-inner"
				@click="handleClickAppendInner"
		>
			<slot name="appendInner">
				<origam-avatar
						v-if="appendInnerAvatar"
						key="append-avatar"
						:density="density"
						:image="appendInnerAvatar"
				/>
				<origam-icon
						v-if="appendInnerIcon"
						key="append-icon"
						:density="density"
						:icon="appendInnerIcon"
				/>
			</slot>
		</div>

		<div class="origam-field__outline">
			<div class="v-field__outline__start"/>
			<div class="v-field__outline__end"/>
		</div>

	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useSlots, watch } from 'vue'
	import { OrigamAvatar, OrigamExpandX, OrigamIcon, OrigamLabel, OrigamProgress } from '../../components'

	import { useAdjacentInner, useBothColor, useDensity, useFocus, useLoader, useProps, useRtl } from '../../composables'

	import { EASING, KEYBOARD_VALUES, PROGRESS_TYPE } from '../../enums'

	import type { IFieldProps } from '../../interfaces'

	import type { TOrigamLabel } from "../../types"

	import { animate, convertToUnit, getUid, nullifyTransforms } from '../../utils'

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

	const origamLabelRef = ref<TOrigamLabel>()
	const origamFloatingLabelRef = ref<TOrigamLabel>()
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
			class: 'origam-field__input',
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
			const el: HTMLElement = origamLabelRef.value!.$el
			const targetEl: HTMLElement = origamFloatingLabelRef.value!.$el

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
				const scale = parseFloat(targetStyle.getPropertyValue('--origam-field__label---font-size'))
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
			'origam-field',
			{
				'origam-field--active': isActive.value,
				'origam-field--appended': hasAppendInner.value,
				'origam-field--center-affix': props.centerAffix,
				'origam-field--disabled': props.disabled,
				'origam-field--dirty': props.dirty,
				'origam-field--error': props.error,
				'origam-field--flat': props.flat,
				'origam-field--has-background': !!props.bgColor,
				'origam-field--persistent-clear': props.persistentClear,
				'origam-field--prepended': hasPrependInner.value,
				'origam-field--reverse': props.reverse,
				'origam-field--single-line': props.singleLine,
				'origam-field--no-label': !hasLabel.value,
				'origam-text-field--prefixed': props.prefix,
				'origam-text-field--suffixed': props.suffix
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
	.origam-field {
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
		padding-inline: var(--origam-field---padding-start) var(--origam-field---padding-end);

		--origam-field---padding-start: 16px;
		--origam-field---padding-end: 16px;
		--origam-field---padding-top: 8px;
		--origam-field---padding-bottom: 4px;

		--origam-field__input---padding-top: calc(var(--origam-field---padding-top, 8px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)));
		--origam-field__input---padding-bottom: var(--origam-field---padding-bottom, 4px);
		--origam-field__input---padding-start: var(--origam-field---padding-bottom, 16px);
		--origam-field__input---padding-end: var(--origam-field---padding-bottom, 16px);

		.origam-chip {
			--origam-chip---height: 24px;
		}

		:deep(.origam-field__input) {
			align-items: center;
			color: inherit;
			column-gap: 2px;
			display: flex;
			flex-wrap: wrap;
			letter-spacing: 0.009375em;
			opacity: 0.7;
			min-height: max(calc(var(--origam-input__control---height, 56px) + var(--origam-input---density, 0px)), 1.5rem + var(--origam-field__input---padding-top) + var(--origam-field__input---padding-bottom));
			min-width: 0;
			padding-inline: var(--origam-field__input---padding-start) var(--origam-field__input---padding-end);
			padding-top: var(--origam-field__input---padding-top);
			padding-bottom: var(--origam-field__input---padding-bottom);
			position: relative;
			width: 100%;
			row-gap: calc(8px - var(--origam-input---density, 0));

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
			min-height: max(56px, 1.5rem + var(--origam-field-input---padding-top, 0px) + var(--origam-field-input---padding-bottom, 0px));
			padding-top: calc(var(--origam-field---padding-top, 4px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)));
			padding-bottom: var(--origam-field---padding-bottom, 6px);
		}

		&__prefix {
			padding-inline-start: var(--origam-field---padding-start, 16px);
		}

		&__suffix {
			padding-inline-end: var(--origam-field---padding-end, 16px);
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
			padding-top: var(--origam-input---padding-top, 8px);
			padding-inline: var(--origam-field---padding-start) var(--origam-field---padding-end);

			> .origam-icon {
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
			margin-inline-start: var(--origam-field__input---padding-start, 0);
			margin-inline-end: var(--origam-field__input---padding-end, 0);
			max-width: calc(100% - var(--origam-field__input---padding-start, 0) - var(--origam-field__input---padding-end, 0));
			pointer-events: none;
			position: absolute;
			top: calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density) - 8px);
			transform-origin: left center;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform;
			z-index: 1;

			&.origam-label--floating {
				font-size: var(--origam-field__label---font-size);
				visibility: hidden;
				max-width: 100%;
			}
		}

		&--prefixed {
			--origam-field---padding-start: 6px;
		}

		&--suffixed {
			--origam-field---padding-end: 6px;
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

				&.origam-label--floating {
					transform: none;
					top: calc(var(--origam-input---padding-top, 16px) / 2 + var(--origam-input---density, 0px));
				}
			}
		}

		&--active {
			#{$this}__label {
				visibility: hidden;

				&.origam-label--floating {
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
			--origam-field---padding-start: 6px;
		}

		&--appended {
			--origam-field---padding-end: 6px;
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
				> .origam-icon {
					opacity: 1;
				}
			}
		}

		&--error {
			&:not(#{$this}--disabled) {
				#{$this}__append-inner,
				#{$this}__clearable,
				#{$this}__prepend-inner {
					> .origam-icon {
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
		--origam-field__label---font-size: 0.75em;
	}
</style>
