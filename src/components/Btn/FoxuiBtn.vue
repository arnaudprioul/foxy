<template>
	<component
			:is="link.tag"
			:id="id"
			v-ripple="isRipple"
			:class="btnClasses"
			:disabled="isDisabled || undefined"
			:href="link.href.value"
			:type="link.tag === 'a' ? undefined : 'button'"
			:value="valueAttr"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="overlay"
		    class="foxui-btn__overlay"
    />
		<span
				key="underlay"
				class="foxui-btn__underlay"
		/>

		<slot name="wrapper">
			<foxui-loader
					:loading="loading"
					class="foxui-btn__loader"
			>
				<template
						v-if="hasLoader"
						#loader
				>
					<slot
							name="loader"
							v-bind="progressProps"
					>
						<foxui-progress-circular
								ref="foxuiProgressRef"
								v-bind="progressProps"
						/>
					</slot>
				</template>

				<template #default>
          <span
		          v-if="hasPrepend"
		          key="prepend"
		          class="foxui-btn__prepend"
		          @click="handleClickPrepend"
          >
            <slot name="prepend">
              <foxui-avatar
		              v-if="prependAvatar"
		              key="prepend-avatar"
		              :density="density"
		              :image="prependAvatar"
              />
              <foxui-icon
		              v-if="prependIcon"
		              key="prepend-icon"
		              :density="density"
		              :icon="prependIcon"
              />
            </slot>
          </span>

					<span
							class="foxui-btn__content"
							data-no-activator=""
					>
            <slot name="default">
              <template v-if="hasIcon">
                <foxui-icon
		                key="content-icon"
		                :icon="icon as TIcon"
                />
              </template>
              <template v-else>
                {{ text }}
              </template>
            </slot>
          </span>

					<span
							v-if="hasAppend"
							key="append"
							class="foxui-btn__append"
							@click="handleClickAppend"
					>
            <slot name="append">
             <foxui-avatar
		             v-if="appendAvatar"
		             key="append-avatar"
		             :density="density"
		             :image="appendAvatar"
             />
             <foxui-icon
		             v-if="appendIcon"
		             key="append-icon"
		             :density="density"
		             :icon="appendIcon"
             />
           </slot>
          </span>
				</template>
			</foxui-loader>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiAvatar, FoxuiIcon, FoxuiLoader, FoxuiProgressCircular } from '@foxui/components'

	import {
		useActive,
		useAdjacent,
		useBorder,
		useColorEffect,
		useDensity,
		useDimension,
		useElevation,
		useGroupItem,
		useHover,
		useLink,
		useLoader,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useSelectLink,
		useSize,
		useStatus,
		useStyle
	} from '@foxui/composables'

	import { FOXUI_BTN_TOGGLE_KEY } from '@foxui/consts'

	import { vRipple } from '@foxui/directives'

	import { DENSITY, SIZES } from '@foxui/enums'

	import type { IBtnProps } from '@foxui/interfaces'

	import type { TFoxuiProgressCircular, TIcon } from "@foxui/types"

	import { computed, ref, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IBtnProps>(), {
		tag: 'button',
		ripple: true,
		active: undefined,
		size: SIZES.DEFAULT,
		density: DENSITY.DEFAULT
	})

	defineEmits(['group:selected', 'click:append', 'click:prepend'])

	const {filterProps} = useProps<IBtnProps>(props)

	const foxuiProgressRef = ref<TFoxuiProgressCircular>()

	const group = useGroupItem(props, FOXUI_BTN_TOGGLE_KEY, false)
	const link = useLink(props, attrs)
	const slots = useSlots()

	useSelectLink(link, group?.select)

	const {isHover, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave} = useHover(props)
	const {isActive: active} = useActive(props)

	const isActive = computed(() => {
		if (active.value !== undefined) {
			return active.value
		}

		if (link.isLink.value) {
			return link.isActive?.value
		}

		return group?.isSelected.value
	})
	const isDisabled = computed(() => group?.disabled.value || props.disabled)
	const valueAttr = computed(() => {
		if (props.value === undefined || typeof props.value === 'symbol') return undefined

		return Object(props.value) === props.value
				? JSON.stringify(props.value, null, 0)
				: props.value
	})
	const isRipple = computed(() => {
		return [
			!isDisabled.value && props.ripple,
			null,
			props.icon ? ['center'] : null
		]
	})

	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {loaderClasses} = useLoader(props)
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {icon, prependIcon, appendIcon, statusClasses} = useStatus(props)
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive)
	const {elevationClasses, elevationStyles} = useElevation(props, toRef(props, 'flat'), bgColor)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, prependIcon, appendIcon)

	const handleClick = (e: MouseEvent) => {
		if (
				isDisabled.value ||
				(link.isLink.value && (
						e.metaKey ||
						e.ctrlKey ||
						e.shiftKey ||
						(e.button !== 0) ||
						attrs.target === '_blank'
				))
		) return

		link.navigate?.(e)
		group?.toggle()
	}

	const hasIcon = computed(() => {
		return !!(icon.value && props.icon !== true)
	})
	const hasLoader = computed(() => {
		return slots.loader || props.loading
	})

	const progressProps = computed(() => {
		return Object.assign({
					size: '23',
					indeterminate: true
				},
				foxuiProgressRef.value?.filterProps(props, ['class', 'style', 'id']))
	})

	// CLASS & STYLES

	const btnStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			sizeStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const btnClasses = computed(() => {
		return [
			'foxui-btn',
			group?.selectedClass.value,
			{
				'foxui-btn--active': isActive.value,
				'foxui-btn--block': props.block,
				'foxui-btn--disabled': isDisabled.value,
				'foxui-btn--flat': props.flat,
				'foxui-btn--icon': !!props.icon,
				'foxui-btn--loading': props.loading,
				'foxui-btn--slim': props.slim,
				'foxui-btn--stacked': props.stacked
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			positionClasses.value,
			roundedClasses.value,
			sizeClasses.value,
			statusClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(btnStyles)

	// EXPOSE

	defineExpose({
		group,
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-btn {
		$this: &;

		position: var(--foxui-btn---position, relative);
		vertical-align: middle;
		flex-shrink: 0;

		font-size: var(--foxui-btn---font-size);
		font-weight: var(--foxui-btn---font-weight);
		letter-spacing: var(--foxui-btn---letter-spacing);
		line-height: var(--foxui-btn---line-height);
		text-decoration: var(--foxui-btn---text-decoration);
		text-indent: var(--foxui-btn---text-indent);

		transition-property: box-shadow, transform, opacity, background;
		transition-duration: 0.28s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		padding: 0 16px;

		width: var(--foxui-btn---width, auto);
		min-width: var(--foxui-btn---min-width, calc(var(--foxui-btn---width, 64px) + var(--foxui-btn---density, 0)));
		max-width: var(--foxui-btn---max-width, 100%);
		height: var(--foxui-btn---height, 36px);
		min-height: var(--foxui-btn---min-height, calc(var(--foxui-btn---height, 36px) + var(--foxui-btn---density, 0)));
		max-height: var(--foxui-btn---max-height, 100%);

		background-color: var(--foxui-btn---background-color, rgb(230, 230, 230));
		color: var(--foxui-btn---color, rgba(30, 30, 30, 0.87));

		outline: none;
		cursor: pointer;
		user-select: none;
		opacity: var(--foxui-btn---opacity, 1);

		border-width: var(--foxui-btn-group---border-width);
		border-style: var(--foxui-btn-group---border-style);
		border-color: var(--foxui-btn-group---border-color);
		border-radius: var(--foxui-btn-group---border-radius, 4px);

		&--size-x-small {
			--foxui-btn---height: 20px;
			--foxui-btn---font-size: 0.625rem;
			--foxui-btn---min-width: 36px;
			padding: 0 8px;

			:deep(.foxui-icon) {
				--foxui-btn---font-size: 16px;
			}
		}

		&--size-small {
			--foxui-btn---height: 28px;
			--foxui-btn---font-size: 0.75rem;
			--foxui-btn---min-width: 50px;
			padding: 0 12px;

			:deep(.foxui-icon) {
				--foxui-btn---font-size: 20px;
			}
		}

		&--size-default {
			--foxui-btn---height: 36px;
			--foxui-btn---font-size: 0.875rem;
			--foxui-btn---min-width: 64px;
			padding: 0 16px;

			:deep(.foxui-icon) {
				--foxui-btn---font-size: 24px;
			}
		}

		&--size-large {
			--foxui-btn---height: 44px;
			--foxui-btn---font-size: 1rem;
			--foxui-btn---min-width: 78px;
			padding: 0 20px;

			:deep(.foxui-icon) {
				--foxui-btn---font-size: 28px;
			}
		}

		&--size-x-large {
			--foxui-btn---height: 52px;
			--foxui-btn---font-size: 1.125rem;
			--foxui-btn---min-width: 92px;
			padding: 0 24px;

			:deep(.foxui-icon) {
				--foxui-btn---font-size: 32px;
			}
		}

		&--density-comfortable {
			--foxui-btn---density: 8px;
		}

		&--density-default {
			--foxui-btn---density: 0px;
		}

		&--density-compact {
			--foxui-btn---density: -8px;
		}

		&--border {
			--foxui-btn---border-width: thin;
		}

		&--absolute {
			--foxui-btn---position: absolute;
		}

		&--fixed {
			--foxui-btn---position: fixed;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--foxui-btn__overlay---opacity: calc(0.12 * 1);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--foxui-btn__overlay---opacity: calc(0.12 * 1);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--foxui-btn__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&--icon {
			--foxui-btn---border-radius: 50%;

			--foxui-btn---min-width: 0;
			--foxui-btn---width: calc(var(--foxui-btn---height, 36px) + var(--foxui-btn---density, 0));
			--foxui-btn---height: calc(var(--foxui-btn---height, 36px) + var(--foxui-btn---density, 0));

			padding: 0;
		}

		&--flat {
			box-shadow: none;
		}

		&--block {
			display: flex;
			flex: 1 0 auto;

			--foxui-btn---min-width: 100%;
		}

		&--disabled {
			pointer-events: none;
			--foxui-btn---opacity: 0.26;

			&:hover {
				--foxui-btn---opacity: 0.26;
			}
		}

		&--loading {
			pointer-events: none;

			#{$this}__content,
			#{$this}__prepend,
			#{$this}__append {
				opacity: 0;
			}
		}

		&--stacked {
			#{$this}__loader {
				grid-template-areas: "prepend" "content" "append";
				grid-template-columns: auto;
				grid-template-rows: max-content max-content max-content;
				justify-items: center;
				align-content: center;
			}

			#{$this}__content {
				flex-direction: column;
				line-height: 1.25;
			}

			#{$this}__prepend,
			#{$this}__append,
			#{$this}__content > :deep(.foxui-icon--start),
			#{$this}__content > :deep(.foxui-icon--end) {
				margin-inline: 0;
			}

			#{$this}__prepend,
			#{$this}__content > :deep(.foxui-icon--start) {
				margin-bottom: 4px;
			}

			#{$this}__append,
			#{$this}__content > :deep(.foxui-icon--end) {
				margin-top: 4px;
			}

			#{$this}__content {
				white-space: normal;
			}

			&#{$this}--size-x-small {
				--foxui-btn---height: 56px;
				font-size: 0.625rem;
				min-width: 56px;
				padding: 0 12px;
			}

			&#{$this}--size-small {
				--foxui-btn---height: 64px;
				font-size: 0.75rem;
				min-width: 64px;
				padding: 0 14px;
			}

			&#{$this}--size-default {
				--foxui-btn---height: 72px;
				font-size: 0.875rem;
				min-width: 72px;
				padding: 0 16px;
			}

			&#{$this}--size-large {
				--foxui-btn---height: 80px;
				font-size: 1rem;
				min-width: 80px;
				padding: 0 18px;
			}

			&#{$this}--size-x-large {
				--foxui-btn---height: 88px;
				font-size: 1.125rem;
				min-width: 88px;
				padding: 0 20px;
			}

			&#{$this}--density-default {
				height: calc(var(--foxui-btn---height) + 0px);
			}

			&#{$this}--density-compact {
				height: calc(var(--foxui-btn---height) + -24px);
			}
		}

		&--slim {
			padding: 0 8px;
		}

		&--rounded {
			--foxui-btn---border-radius: 24px;

			&#{$this}--icon {
				--foxui-btn---border-radius: 4px;
			}
		}

		#{$this}__loader {
			align-items: center;
			justify-content: center;
			display: inline-grid;
			grid-template-areas: "prepend content append";
			grid-template-columns: max-content auto max-content;
			height: 100%;
			width: 100%;

			:deep(.foxui-progress--circular) {
				width: 1.5em;
				height: 1.5em;
			}
		}

		&__content,
		&__prepend,
		&__append {
			align-items: center;
			display: flex;

			transition: transform, opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&__prepend {
			grid-area: prepend;

			margin-inline-start: var(--foxui-btn__prepend---margin-inline-start);
			margin-inline-end: var(--foxui-btn__prepend---margin-inline-end);
		}

		&__append {
			grid-area: append;

			margin-inline-start: var(--foxui-btn__append---margin-inline-start);
			margin-inline-end: var(--foxui-btn__append---margin-inline-end);
		}

		&__content {
			grid-area: content;
			justify-content: center;
			white-space: nowrap;

			margin-inline-start: var(--foxui-btn__content---margin-inline-start);
			margin-inline-end: var(--foxui-btn__content---margin-inline-end);

			> :deep(.foxui-icon--start) {
				--foxui-btn__content---margin-inline-start: calc(var(--foxui-btn---height) / -9);
				--foxui-btn__content---margin-inline-end: calc(var(--foxui-btn---height) / 4.5);
			}

			> :deep(.foxui-icon--end) {
				--foxui-btn__content---margin-inline-start: calc(var(--foxui-btn---height) / 4.5);
				--foxui-btn__content---margin-inline-end: calc(var(--foxui-btn---height) / -9);
			}
		}

		&__overlay {
			background-color: #000;
			border-radius: inherit;
			opacity: var(--foxui-btn__overlay---opacity, 0);
			transition: opacity 0.2s ease-in-out;
		}

		&__overlay,
		&__underlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}
	}
</style>

<style>
	:root {
		--foxui-btn---position: relative;

		--foxui-btn---density: 0;

		--foxui-btn---border-radius: 4px;
		--foxui-btn---border-width: 0;
		--foxui-btn---border-style: solid;
		--foxui-btn---border-color: currentColor;

		--foxui-btn---background-color: rgb(230, 230, 230);
		--foxui-btn---color: rgba(30, 30, 30, 0.87);

		--foxui-btn---width: auto;
		--foxui-btn---min-width: calc(var(--foxui-btn---width, 36px) + var(--foxui-btn---density, 0));
		--foxui-btn---max-width: 100%;
		--foxui-btn---height: 36px;
		--foxui-btn---min-height: calc(var(--foxui-btn---height, 36px) + var(--foxui-btn---density, 0));
		--foxui-btn---max-height: 100%;

		--foxui-btn---font-size: 0.875rem;
		--foxui-btn---font-weight: 500;
		--foxui-btn---letter-spacing: 0.0892857143em;
		--foxui-btn---line-height: 1;
		--foxui-btn---text-decoration: none;
		--foxui-btn---text-indent: 0.0892857143em;
		--foxui-btn---opacity: 1;

		--foxui-btn__overlay---opacity: 0;

		--foxui-btn__content---margin-inline-start: 0;
		--foxui-btn__content---margin-inline-end: 0;

		--foxui-btn__append---margin-inline-end: calc(var(--foxui-btn---height) / -9);
		--foxui-btn__append---margin-inline-start: calc(var(--foxui-btn---height) / 4.5);

		--foxui-btn__prepend---margin-inline-start: calc(var(--foxui-btn---height) / -9);
		--foxui-btn__prepend---margin-inline-end: calc(var(--foxui-btn---height) / 4.5);
	}
</style>
