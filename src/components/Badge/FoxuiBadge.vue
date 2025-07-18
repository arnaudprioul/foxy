<template>
	<component
			:is="tag"
			:class="badgeClasses"
			:style="badgeStyles"
			v-bind="restAttrs"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxui-badge__wrapper">
			<slot name="default"/>

			<foxui-transition :transition="transition">
        <span
		        v-show="modelValue"
		        :id="id"
		        :aria-label="t(label, content)"
		        aria-atomic="true"
		        aria-live="polite"
		        class="foxui-badge__badge"
		        role="status"
		        v-bind="badgeAttrs"
        >
          <template v-if="!dot">
            <slot name="badge">
              <template v-if="hasIcon">
                <foxui-icon :icon="icon"/>
              </template>
              <template v-else>
                {{ content }}
              </template>
            </slot>
          </template>
        </span>
			</foxui-transition>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiIcon, FoxuiScaleRotate, FoxuiTransition } from '@foxui/components'

	import {
		useActive,
		useBorder,
		useColorEffect,
		useElevation,
		useHover,
		useLocale,
		useLocation,
		useProps,
		useRounded,
		useStatus,
		useStyle
	} from '@foxui/composables'

	import type { IBadgeProps } from '@foxui/interfaces'
	import type { TTransitionProps } from "@foxui/types"

	import { omit, pick } from '@foxui/utils'

	import { computed, ComputedRef, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IBadgeProps>(), {
		tag: 'div',
		location: 'top right',
		label: 'foxui.badge',
		transition: () => ({component: FoxuiScaleRotate}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IBadgeProps>(props)
	const {t} = useLocale()

	const attrs = useAttrs()

	const {hoverClasses, isHover, onMouseleave: handleMouseleave, onMouseenter: handleMouseenter} = useHover(props)
	const {activeClasses, isActive} = useActive(props, 'modelValue')
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {icon, statusClasses} = useStatus(props)
	const {locationStyles} = useLocation(props, true, side => {
		const base = props.floating
				? (props.dot ? 2 : 4)
				: (props.dot ? 8 : 12)

		return base + (
				['top', 'bottom'].includes(side) ? +(props.offsetY ?? 0)
						: ['left', 'right'].includes(side) ? +(props.offsetX ?? 0)
								: 0
		)
	})

	const hasIcon = computed(() => {
		return !!icon.value
	})

	const content = computed(() => {
		const value = Number(props.content)

		if (!props.max || isNaN(value)) {
			return props.content
		} else if (value <= +props.max) {
			return value
		}

		return `${props.max}+`
	})

	const badgeAttrs = computed(() => {
		return pick(attrs as Record<string, any>, [
			'aria-atomic',
			'aria-label',
			'aria-live',
			'role',
			'title'
		])
	})
	const restAttrs = computed(() => {
		return omit(attrs as Record<string, any>, [
			'aria-atomic',
			'aria-label',
			'aria-live',
			'role',
			'title'
		])
	})

	// CLASS & STYLES

	const badgeStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const badgeClasses = computed(() => {
		return [
			'foxui-badge',
			{
				'foxui-badge--dot': props.dot,
				'foxui-badge--floating': props.floating,
				'foxui-badge--inline': props.inline
			},
			elevationClasses.value,
			activeClasses.value,
			hoverClasses.value,
			roundedClasses.value,
			borderClasses.value,
			statusClasses.value,
			props.class
		]
	})

	const badgeContentStyles = computed(() => {
		return [
			elevationStyles.value,
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			props.inline ? {} : locationStyles.value
		] as StyleValue
	})

	const {id, css, load, isLoaded, unload} = useStyle(badgeContentStyles)

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
	.foxui-badge {
		$this: &;

		display: inline-flex;
		line-height: 1;

		&__badge {
			align-items: center;
			justify-content: center;
			display: inline-flex;

			position: var(--foxui-badge__badge---position);
			pointer-events: var(--foxui-badge__badge---pointer-events);
			transition: var(--foxui-badge__badge---transition);

			border-width: var(--foxui-badge__badge---border-width);
			border-style: var(--foxui-badge__badge---border-style);
			border-color: var(--foxui-badge__badge---border-color);
			border-radius: var(--foxui-badge__badge---border-radius);

			font-size: var(--foxui-badge__badge---font-size);
			font-weight: var(--foxui-badge__badge---font-weight);
			text-align: var(--foxui-badge__badge---text-align);
			text-indent: var(--foxui-badge__badge---text-indent);
			white-space: var(--foxui-badge__badge---white-space);

			height: var(--foxui-badge__badge---height);
			min-width: var(--foxui-badge__badge---min-width);

			padding-block-start: var(--foxui-badge__badge---padding-block-start);
			padding-block-end: var(--foxui-badge__badge---padding-block-end);
			padding-inline-start: var(--foxui-badge__badge---padding-inline-start);
			padding-inline-end: var(--foxui-badge__badge---padding-inline-end);
			margin-block-start: var(--foxui-badge__badge---margin-block-start);
			margin-block-end: var(--foxui-badge__badge---margin-block-end);
			margin-inline-start: var(--foxui-badge__badge---margin-inline-start);
			margin-inline-end: var(--foxui-badge__badge---margin-inline-end);

			background-color: var(--foxui-badge__badge---background-color);
			color: var(--foxui-badge__badge---color);

			:deep(.foxui-icon) {
				color: inherit;
				font-size: 0.75rem;
				margin: 0 -2px;
			}

			:deep(img),
			:deep(.foxui-img) {
				height: 100%;
				width: 100%;
			}
		}

		&__wrapper {
			position: relative;

			display: var(--foxui-badge__wrapper---display);
			align-items: var(--foxui-badge__wrapper---align-items);
			justify-content: var(--foxui-badge__wrapper---justify-content);

			padding-block-start: var(--foxui-badge__wrapper---padding-block-start);
			padding-block-end: var(--foxui-badge__wrapper---padding-block-end);
			padding-inline-start: var(--foxui-badge__wrapper---padding-inline-start);
			padding-inline-end: var(--foxui-badge__wrapper---padding-inline-end);
			margin-block-start: var(--foxui-badge__wrapper---margin-block-start);
			margin-block-end: var(--foxui-badge__wrapper---margin-block-end);
			margin-inline-start: var(--foxui-badge__wrapper---margin-inline-start);
			margin-inline-end: var(--foxui-badge__wrapper---margin-inline-end);
		}

		&--elevated {
			#{$this}__badge {
				--foxui-badge__badge---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			}
		}

		&--border {
			#{$this}__badge {
				--foxui-badge__badge---border-width: 2px;
			}
		}

		&--dot {
			#{$this}__badge {
				--foxui-badge__badge---border-width: 1.5px;
				--foxui-badge__badge---border-radius: 4.5px;
				--foxui-badge__badge---height: 9px;
				--foxui-badge__badge---width: 9px;
				--foxui-badge__badge---min-width: 0;
				--foxui-badge__badge---padding-block: 0;
				--foxui-badge__badge---padding-inline: 0;
				--foxui-badge__badge---text-indent: -9999px;
			}
		}

		&--inline {
			#{$this}__badge {
				--foxui-badge__badge---position: relative;
				vertical-align: middle;
			}

			#{$this}__wrapper {
				--foxui-badge__wrapper---display: inline-flex;
				--foxui-badge__wrapper---align-items: center;
				--foxui-badge__wrapper---justify-content: center;
				--foxui-badge__wrapper---margin-inline: 4px;
			}
		}

		&--warning {
			--foxui-badge__badge---background-color: var(--foxui-status--warning---background-color, rgb(251, 140, 0));
			--foxui-badge__badge---color: var(--foxui-status--warning---color, #ffffff);
		}

		&--success {
			--foxui-badge__badge---background-color: var(--foxui-status--success---background-color, rgb(76, 175, 80));
			--foxui-badge__badge---color: var(--foxui-status--success---color, #ffffff);
		}

		&--info {
			--foxui-badge__badge---background-color: var(--foxui-status--info---background-color, rgb(33, 150, 243));
			--foxui-badge__badge---color: var(--foxui-status--info---color, #ffffff);
		}

		&--error {
			--foxui-badge__badge---background-color: var(--foxui-status--error---background-color, rgb(207, 102, 121));
			--foxui-badge__badge---color: var(--foxui-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {
		--foxui-badge__wrapper---display: flex;
		--foxui-badge__wrapper---align-items: stretch;
		--foxui-badge__wrapper---justify-content: start;
		--foxui-badge__wrapper---margin-inline-start: 0;
		--foxui-badge__wrapper---margin-inline-end: 0;
		--foxui-badge__wrapper---margin-block-start: 0;
		--foxui-badge__wrapper---margin-block-end: 0;
		--foxui-badge__wrapper---padding-block-start: 0;
		--foxui-badge__wrapper---padding-block-end: 0;
		--foxui-badge__wrapper---padding-inline-start: 0;
		--foxui-badge__wrapper---padding-inline-end: 0;

		--foxui-badge__badge---align-items: center;
		--foxui-badge__badge---justify-content: center;
		--foxui-badge__badge---display: inline-flex;
		--foxui-badge__badge---position: absolute;
		--foxui-badge__badge---font-size: 0.75rem;
		--foxui-badge__badge---font-weight: 500;
		--foxui-badge__badge---text-align: center;
		--foxui-badge__badge---text-indent: 0;
		--foxui-badge__badge---white-space: nowrap;
		--foxui-badge__badge---height: 1.25rem;
		--foxui-badge__badge---min-width: 20px;
		--foxui-badge__badge---pointer-events: auto;
		--foxui-badge__badge---transition-duration: 0.225s;
		--foxui-badge__badge---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-badge__badge---transition-property: all;
		--foxui-badge__badge---transition: var(--foxui-badge__badge---transition-property) var(--foxui-badge__badge---transition-duration) var(--foxui-badge__badge---transition-timing-function);
		--foxui-badge__badge---margin-inline-start: 0;
		--foxui-badge__badge---margin-inline-end: 0;
		--foxui-badge__badge---margin-block-start: 0;
		--foxui-badge__badge---margin-block-end: 0;
		--foxui-badge__badge---padding-block-start: 4px;
		--foxui-badge__badge---padding-block-end: 4px;
		--foxui-badge__badge---padding-inline-start: 6px;
		--foxui-badge__badge---padding-inline-end: 6px;
		--foxui-badge__badge---color: rgba(30, 30, 30, 0.87);
		--foxui-badge__badge---background-color: rgb(230, 230, 230);
		--foxui-badge__badge---border-top-width: 0;
		--foxui-badge__badge---border-left-width: 0;
		--foxui-badge__badge---border-bottom-width: 0;
		--foxui-badge__badge---border-right-width: 0;
		--foxui-badge__badge---border-width: var(--foxui-badge__badge---border-top-width) var(--foxui-badge__badge---border-left-width) var(--foxui-badge__badge---border-bottom-width) var(--foxui-badge__badge---border-right-width);
		--foxui-badge__badge---border-color: currentColor;
		--foxui-badge__badge---border-style: solid;
		--foxui-badge__badge---border-radius: 10px;
	}
</style>
