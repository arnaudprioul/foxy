<template>
	<component
			:is="tag"
			:id="id"
			:class="bottomNavClasses"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxy-bottom-nav__content">
			<slot name="default">
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<slot
							:name="`item.${index}`"
							v-bind="{props: item}"
					>
						<slot
								name="item"
								v-bind="{props: item, index}"
						>
							<foxy-btn
									ref="foxyBtnRef"
									class="foxy-bottom-nav__btn"
									v-bind="item"
							/>
						</slot>
					</slot>
				</template>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBtn } from "@foxy/components"
	import {
		useActive,
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useGroup,
		useHover,
		useLayoutItem,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSsrBoot,
		useStyle
	} from '@foxy/composables'

	import { FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'
	import { MODE } from "@foxy/enums"

	import type { IBottomNavProps, IBreadcrumbItemProps } from '@foxy/interfaces'
	import type { TFoxyBtn } from "@foxy/types"

	import { convertToUnit, int } from '@foxy/utils'

	import { computed, ComputedRef, Ref, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IBottomNavProps>(), {
		tag: 'nav',
		name: 'bottom-navigation',
		modelValue: true,
		selectedClass: 'foxy-bottom-nav__btn--selected',
		mode: MODE.VERTICAL,
		items: () => [] as Array<TFoxyBtn>
	})

	defineEmits(['update:modelValue', 'update:active', 'update:hover'])

	const {filterProps} = useProps<IBottomNavProps>(props)

	const {borderClasses, borderStyles} = useBorder(props)
	const {isActive, activeClasses} = useActive(props, 'modelValue')
	const {isHover, hoverClasses, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave} = useHover(props)
	const {colorStyles} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {ssrBootStyles} = useSsrBoot()

	const height = computed(() => {
		if (props.height) {
			return Number(props.height) - (props.density === 'compact' ? 8 : 0)
		}

		return 48
	})

	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order)),
		position: computed(() => 'bottom'),
		layoutSize: computed(() => isActive.value ? height.value : 0),
		elementSize: height,
		active: isActive as Ref<boolean>,
		absolute: toRef(props, 'absolute')
	})

	const items = computed(() => {
		return props.items.map((item) => {
			return {
				...item,
				density: props.density ?? item.density,
				color: props.color ?? item.color,
				bgColor: props.bgColor ?? item.bgColor,
				hoverColor: props.hoverColor ?? item.hoverColor,
				hoverBgColor: props.hoverBgColor ?? item.hoverBgColor,
				activeColor: props.activeColor ?? item.activeColor,
				activeBgColor: props.activeBgColor ?? item.activeBgColor
			}
		}) as Array<IBreadcrumbItemProps>
	})

	useGroup(props, FOXY_BTN_TOGGLE_KEY)

	// CLASS & STYLES

	const bottomNavStyles = computed(() => {
		return [
			{
				height: props.height ? convertToUnit(height.value) : undefined,
				transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
			},
			roundedStyles.value,
			colorStyles.value,
			borderStyles.value,
			layoutItemStyles.value,
			ssrBootStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const bottomNavClasses = computed(() => {
		return [
			'foxy-bottom-nav',
			`foxy-bottom-nav--${props.mode}`,
			{
				'foxy-bottom-nav--grow': props.grow
			},
			activeClasses.value,
			hoverClasses.value,
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(bottomNavStyles)

	// EXPOSE

	defineExpose({
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
	.foxy-bottom-nav {
		$this: &;

		display: flex;
		overflow: hidden;
		position: absolute;

		transition: var(--foxy-bottom-bar---transition);

		max-width: var(--foxy-bottom-bar---max-width);
		height: calc(var(--foxy-bottom-bar---height) - var(--foxy-bottom-bar---density));

		background: var(--foxy-bottom-bar---background);
		box-shadow: var(--foxy-bottom-bar---box-shadow);
		color: var(--foxy-bottom-bar---color);

		border-color: var(--foxy-bottom-bar---border-color);
		border-style: var(--foxy-bottom-bar---border-style);
		border-width: var(--foxy-bottom-bar---border-width);
		border-radius: var(--foxy-bottom-bar---border-radius);

		padding-block-start: calc(var(--foxy-bottom-bar---padding-block-start) - var(--foxy-bottom-bar---density));
		padding-block-end: calc(var(--foxy-bottom-bar---padding-block-end) - var(--foxy-bottom-bar---density));
		padding-inline-start: calc(var(--foxy-bottom-bar---padding-inline-start) - var(--foxy-bottom-bar---density));
		padding-inline-end: calc(var(--foxy-bottom-bar---padding-inline-end) - var(--foxy-bottom-bar---density));
		margin-block-start: var(--foxy-bottom-bar---margin-block-start);
		margin-block-end: var(--foxy-bottom-bar---margin-block-end);
		margin-inline-start: var(--foxy-bottom-bar---margin-inline-start);
		margin-inline-end: var(--foxy-bottom-bar---margin-inline-end);

		&__content {
			flex: none;
			display: flex;
			justify-content: var(--foxy-bottom-bar__content---justify-content);
			align-items: var(--foxy-bottom-bar__content---align-items);
			flex-wrap: var(--foxy-bottom-bar__content---flex-wrap);
			width: 100%;
			transform: var(--foxy-bottom-bar__content--transform);

			> :deep(.foxy-btn) {
				--foxy-btn---font-size: 0.75rem;
				--foxy-btn---text-transform: none;

				--foxy-btn---height: 100%;
				--foxy-btn---width: auto;
				--foxy-btn---max-width: 168px;
				--foxy-btn---min-width: 80px;

				--foxy-btn---border-radius: 0;

				.foxy-btn__content,
				.foxy-btn__icon {
					transition: inherit;
				}

				.foxy-btn__icon {
					font-size: 1.5rem;
				}
			}
		}

		&--elevated {
			--foxy-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxy-bottom-bar---border-width: thin;
		}

		&--rounded {
			--foxy-bottom-bar---border-radius: 4px;
		}

		&--density-default {
			--foxy-bottom-bar---density: 0px;
		}

		&--density-compact {
			--foxy-bottom-bar---density: 8px;
		}

		&--active {
			--foxy-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--grow {
			#{$this}__content {
				> :deep(.foxy-btn) {
					flex-grow: 1;
				}
			}
		}

		&--horizontal {
			#{$this}__content {
				> :deep(.foxy-btn) {
					.foxy-btn__loader {
						display: flex;
					}
				}
			}
		}

		&--vertical,
		&--shift {
			#{$this}__content {
				> :deep(.foxy-btn) {
					.foxy-btn__loader {
						grid-template-areas: "prepend" "content" "append";
						grid-template-columns: auto;
						grid-template-rows: max-content max-content max-content;
						justify-items: center;
						align-content: center;
					}

					.foxy-btn__prepend {
						--foxy-btn__prepend---margin-inline-end: 0;
					}

					.foxy-btn__append {
						--foxy-btn__prepend---margin-inline-start: 0;
					}

					.foxy-btn__content {
						--foxy-btn__prepend---margin-inline-start: 0;
						--foxy-btn__prepend---margin-inline-end: 0;
					}
				}
			}
		}

		&--shift {
			#{$this}__content {
				> :deep(.foxy-btn) {
					&:not(#{$this}__item--selected) {
						.foxy-btn__content {
							--foxy-bottom-bar__content--transform: translateY(0.5rem);
							transition: inherit;
							opacity: 0;
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxy-bottom-bar---border-top-width: 0;
		--foxy-bottom-bar---border-left-width: 0;
		--foxy-bottom-bar---border-bottom-width: 0;
		--foxy-bottom-bar---border-right-width: 0;
		--foxy-bottom-bar---border-width: var(--foxy-bottom-bar---border-top-width) var(--foxy-bottom-bar---border-left-width) var(--foxy-bottom-bar---border-bottom-width) var(--foxy-bottom-bar---border-right-width);
		--foxy-bottom-bar---border-color: currentColor;
		--foxy-bottom-bar---border-style: solid;
		--foxy-bottom-bar---border-radius: 0;
		--foxy-bottom-bar---density: 0;
		--foxy-bottom-bar---max-width: 100%;
		--foxy-bottom-bar---height: 48px;
		--foxy-bottom-bar---box-shadow: none;
		--foxy-bottom-bar---color: rgba(0, 0, 0, 0.87);
		--foxy-bottom-bar---background: rgb(230, 230, 230);
		--foxy-bottom-bar---margin-inline-start: 0;
		--foxy-bottom-bar---margin-inline-end: 0;
		--foxy-bottom-bar---margin-block-start: 0;
		--foxy-bottom-bar---margin-block-end: 0;
		--foxy-bottom-bar---padding-block-start: 8px;
		--foxy-bottom-bar---padding-block-end: 8px;
		--foxy-bottom-bar---padding-inline-start: 8px;
		--foxy-bottom-bar---padding-inline-end: 8px;
		--foxy-bottom-bar---transition-duration: 0.2s, 0.1s;
		--foxy-bottom-bar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-bottom-bar---transition-property: transform, color;
		--foxy-bottom-bar---transition: var(--foxy-bottom-bar---transition-property) var(--foxy-bottom-bar---transition-duration) var(--foxy-bottom-bar---transition-timing-function);

		--foxy-bottom-bar__content---justify-content: center;
		--foxy-bottom-bar__content---align-items: center;
		--foxy-bottom-bar__content---flex-wrap: nowrap;
		--foxy-bottom-bar__content--transform: none;
	}
</style>
