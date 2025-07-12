<template>
	<component
			:is="link.tag"
			v-ripple="isRipple"
			:class="btnClasses"
			:disabled="isDisabled || undefined"
			:href="link.href.value"
			:type="link.tag === 'a' ? undefined : 'button'"
			:value="valueAttr"
			:id="id"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="overlay"
		    class="foxy-btn__overlay"
    />
		<span
				key="underlay"
				class="foxy-btn__underlay"
		/>

		<slot name="wrapper">
			<foxy-loader
					:loading="loading"
					class="foxy-btn__loader"
			>
				<template
						v-if="hasLoader"
						#loader
				>
					<slot
							name="loader"
							v-bind="progressProps"
					>
						<foxy-progress-circular
								ref="foxyProgressRef"
								v-bind="progressProps"
						/>
					</slot>
				</template>

				<template #default>
          <span
		          v-if="hasPrepend"
		          key="prepend"
		          class="foxy-btn__prepend"
		          @click="handleClickPrepend"
          >
            <slot name="prepend">
              <foxy-avatar
		              v-if="prependAvatar"
		              key="prepend-avatar"
		              :density="density"
		              :image="prependAvatar"
              />
              <foxy-icon
		              v-if="prependIcon"
		              key="prepend-icon"
		              :density="density"
		              :icon="prependIcon"
              />
            </slot>
          </span>

					<span
							class="foxy-btn__content"
							data-no-activator=""
					>
            <slot name="default">
              <template v-if="hasIcon">
                <foxy-icon
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
							class="foxy-btn__append"
							@click="handleClickAppend"
					>
            <slot name="append">
             <foxy-avatar
		             v-if="appendAvatar"
		             key="append-avatar"
		             :density="density"
		             :image="appendAvatar"
             />
             <foxy-icon
		             v-if="appendIcon"
		             key="append-icon"
		             :density="density"
		             :icon="appendIcon"
             />
           </slot>
          </span>
				</template>
			</foxy-loader>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyIcon, FoxyLoader, FoxyProgressCircular } from '@foxy/components'

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
	} from '@foxy/composables'

	import { FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

	import { vRipple } from '@foxy/directives'

	import { DENSITY, SIZES } from '@foxy/enums'

	import type { IBtnProps } from '@foxy/interfaces'

	import type { TFoxyProgressCircular, TIcon } from "@foxy/types"

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

	const foxyProgressRef = ref<TFoxyProgressCircular>()

	const group = useGroupItem(props, FOXY_BTN_TOGGLE_KEY, false)
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
				foxyProgressRef.value?.filterProps(props, ['class', 'style', 'id']))
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
			'foxy-btn',
			group?.selectedClass.value,
			{
				'foxy-btn--active': isActive.value,
				'foxy-btn--block': props.block,
				'foxy-btn--disabled': isDisabled.value,
				'foxy-btn--flat': props.flat,
				'foxy-btn--icon': !!props.icon,
				'foxy-btn--loading': props.loading,
				'foxy-btn--slim': props.slim,
				'foxy-btn--stacked': props.stacked
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
	.foxy-btn {
		$this: &;

		position: var(--foxy-btn---position, relative);
		vertical-align: middle;
		flex-shrink: 0;

		font-size: var(--foxy-btn---font-size);
		font-weight: var(--foxy-btn---font-weight);
		letter-spacing: var(--foxy-btn---letter-spacing);
		line-height: var(--foxy-btn---line-height);
		text-decoration: var(--foxy-btn---text-decoration);
		text-indent: var(--foxy-btn---text-indent);

		transition-property: box-shadow, transform, opacity, background;
		transition-duration: 0.28s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		padding: 0 16px;

		width: var(--foxy-btn---width, auto);
		min-width: var(--foxy-btn---min-width, calc(var(--foxy-btn---width, 64px) + var(--foxy-btn---density, 0)));
		max-width: var(--foxy-btn---max-width, 100%);
		height: var(--foxy-btn---height, 36px);
		min-height: var(--foxy-btn---min-height, calc(var(--foxy-btn---height, 36px) + var(--foxy-btn---density, 0)));
		max-height: var(--foxy-btn---max-height, 100%);

		background-color: var(--foxy-btn---background-color, rgb(230, 230, 230));
		color: var(--foxy-btn---color, rgba(30, 30, 30, 0.87));

		outline: none;
		cursor: pointer;
		user-select: none;
		opacity: var(--foxy-btn---opacity, 1);

		border-width: var(--foxy-btn-group---border-width);
		border-style: var(--foxy-btn-group---border-style);
		border-color: var(--foxy-btn-group---border-color);
		border-radius: var(--foxy-btn-group---border-radius, 4px);

		&--size-x-small {
			--foxy-btn---height: 20px;
			--foxy-btn---font-size: 0.625rem;
			--foxy-btn---min-width: 36px;
			padding: 0 8px;

			:deep(.foxy-icon) {
				--foxy-btn---font-size: 16px;
			}
		}

		&--size-small {
			--foxy-btn---height: 28px;
			--foxy-btn---font-size: 0.75rem;
			--foxy-btn---min-width: 50px;
			padding: 0 12px;

			:deep(.foxy-icon) {
				--foxy-btn---font-size: 20px;
			}
		}

		&--size-default {
			--foxy-btn---height: 36px;
			--foxy-btn---font-size: 0.875rem;
			--foxy-btn---min-width: 64px;
			padding: 0 16px;

			:deep(.foxy-icon) {
				--foxy-btn---font-size: 24px;
			}
		}

		&--size-large {
			--foxy-btn---height: 44px;
			--foxy-btn---font-size: 1rem;
			--foxy-btn---min-width: 78px;
			padding: 0 20px;

			:deep(.foxy-icon) {
				--foxy-btn---font-size: 28px;
			}
		}

		&--size-x-large {
			--foxy-btn---height: 52px;
			--foxy-btn---font-size: 1.125rem;
			--foxy-btn---min-width: 92px;
			padding: 0 24px;

			:deep(.foxy-icon) {
				--foxy-btn---font-size: 32px;
			}
		}

		&--density-comfortable {
			--foxy-btn---density: 8px;
		}

		&--density-default {
			--foxy-btn---density: 0px;
		}

		&--density-compact {
			--foxy-btn---density: -8px;
		}

		&--border {
			--foxy-btn---border-width: thin;
		}

		&--absolute {
			--foxy-btn---position: absolute;
		}

		&--fixed {
			--foxy-btn---position: fixed;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--foxy-btn__overlay---opacity: calc(0.12 * 1);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--foxy-btn__overlay---opacity: calc(0.12 * 1);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--foxy-btn__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&--icon {
			--foxy-btn---border-radius: 50%;

			--foxy-btn---min-width: 0;
			--foxy-btn---width: calc(var(--foxy-btn---height, 36px) + var(--foxy-btn---density, 0));
			--foxy-btn---height: calc(var(--foxy-btn---height, 36px) + var(--foxy-btn---density, 0));

			padding: 0;
		}

		&--flat {
			box-shadow: none;
		}

		&--block {
			display: flex;
			flex: 1 0 auto;

			--foxy-btn---min-width: 100%;
		}

		&--disabled {
			pointer-events: none;
			--foxy-btn---opacity: 0.26;

			&:hover {
				--foxy-btn---opacity: 0.26;
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
			#{$this}__content > :deep(.foxy-icon--start),
			#{$this}__content > :deep(.foxy-icon--end) {
				margin-inline: 0;
			}

			#{$this}__prepend,
			#{$this}__content > :deep(.foxy-icon--start) {
				margin-bottom: 4px;
			}

			#{$this}__append,
			#{$this}__content > :deep(.foxy-icon--end) {
				margin-top: 4px;
			}

			#{$this}__content {
				white-space: normal;
			}

			&#{$this}--size-x-small {
				--foxy-btn---height: 56px;
				font-size: 0.625rem;
				min-width: 56px;
				padding: 0 12px;
			}

			&#{$this}--size-small {
				--foxy-btn---height: 64px;
				font-size: 0.75rem;
				min-width: 64px;
				padding: 0 14px;
			}

			&#{$this}--size-default {
				--foxy-btn---height: 72px;
				font-size: 0.875rem;
				min-width: 72px;
				padding: 0 16px;
			}

			&#{$this}--size-large {
				--foxy-btn---height: 80px;
				font-size: 1rem;
				min-width: 80px;
				padding: 0 18px;
			}

			&#{$this}--size-x-large {
				--foxy-btn---height: 88px;
				font-size: 1.125rem;
				min-width: 88px;
				padding: 0 20px;
			}

			&#{$this}--density-default {
				height: calc(var(--foxy-btn---height) + 0px);
			}

			&#{$this}--density-compact {
				height: calc(var(--foxy-btn---height) + -24px);
			}
		}

		&--slim {
			padding: 0 8px;
		}

		&--rounded {
			--foxy-btn---border-radius: 24px;

			&#{$this}--icon {
				--foxy-btn---border-radius: 4px;
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

			:deep(.foxy-progress--circular) {
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

			margin-inline-start: var(--foxy-btn__prepend---margin-inline-start);
			margin-inline-end: var(--foxy-btn__prepend---margin-inline-end);
		}

		&__append {
			grid-area: append;

			margin-inline-start: var(--foxy-btn__append---margin-inline-start);
			margin-inline-end: var(--foxy-btn__append---margin-inline-end);
		}

		&__content {
			grid-area: content;
			justify-content: center;
			white-space: nowrap;

			margin-inline-start: var(--foxy-btn__content---margin-inline-start);
			margin-inline-end: var(--foxy-btn__content---margin-inline-end);

			> :deep(.foxy-icon--start) {
				--foxy-btn__content---margin-inline-start: calc(var(--foxy-btn---height) / -9);
				--foxy-btn__content---margin-inline-end: calc(var(--foxy-btn---height) / 4.5);
			}

			> :deep(.foxy-icon--end) {
				--foxy-btn__content---margin-inline-start: calc(var(--foxy-btn---height) / 4.5);
				--foxy-btn__content---margin-inline-end: calc(var(--foxy-btn---height) / -9);
			}
		}

		&__overlay {
			background-color: #000;
			border-radius: inherit;
			opacity: var(--foxy-btn__overlay---opacity, 0);
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
		--foxy-btn---position: relative;

		--foxy-btn---density: 0;

		--foxy-btn---border-radius: 4px;
		--foxy-btn---border-width: 0;
		--foxy-btn---border-style: solid;
		--foxy-btn---border-color: currentColor;

		--foxy-btn---background-color: rgb(230, 230, 230);
		--foxy-btn---color: rgba(30, 30, 30, 0.87);

		--foxy-btn---width: auto;
		--foxy-btn---min-width: calc(var(--foxy-btn---width, 36px) + var(--foxy-btn---density, 0));
		--foxy-btn---max-width: 100%;
		--foxy-btn---height: 36px;
		--foxy-btn---min-height: calc(var(--foxy-btn---height, 36px) + var(--foxy-btn---density, 0));
		--foxy-btn---max-height: 100%;

		--foxy-btn---font-size: 0.875rem;
		--foxy-btn---font-weight: 500;
		--foxy-btn---letter-spacing: 0.0892857143em;
		--foxy-btn---line-height: 1;
		--foxy-btn---text-decoration: none;
		--foxy-btn---text-indent: 0.0892857143em;
		--foxy-btn---opacity: 1;

		--foxy-btn__overlay---opacity: 0;

		--foxy-btn__content---margin-inline-start: 0;
		--foxy-btn__content---margin-inline-end: 0;

		--foxy-btn__append---margin-inline-end: calc(var(--foxy-btn---height) / -9);
		--foxy-btn__append---margin-inline-start: calc(var(--foxy-btn---height) / 4.5);

		--foxy-btn__prepend---margin-inline-start: calc(var(--foxy-btn---height) / -9);
		--foxy-btn__prepend---margin-inline-end: calc(var(--foxy-btn---height) / 4.5);
	}
</style>
