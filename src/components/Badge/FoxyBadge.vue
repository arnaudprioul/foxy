<template>
	<component
			:is="tag"
			:class="badgeClasses"
			:style="badgeStyles"
			v-bind="restAttrs"
	>
		<div class="foxy-badge__wrapper">
			<slot name="default"/>

			<foxy-transition :transition="transition">
        <span
		        v-show="modelValue"
		        :aria-label="t(label, content)"
		        :style="badgeContentStyles"
		        aria-atomic="true"
		        aria-live="polite"
		        class="foxy-badge__badge"
		        role="status"
		        v-bind="badgeAttrs"
        >
          <template v-if="!dot">
            <slot name="badge">
              <template v-if="hasIcon">
                <foxy-icon :icon="icon"/>
              </template>
              <template v-else>
                {{ content }}
              </template>
            </slot>
          </template>
        </span>
			</foxy-transition>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyIcon, FoxyScaleRotate, FoxyTransition } from '@foxy/components'

	import { useBorder, useBothColor, useLocale, useLocation, useProps, useRounded, useStatus } from '@foxy/composables'

	import type { IBadgeProps } from '@foxy/interfaces'
	import type { TTransitionProps } from "@foxy/types"

	import { omit, pick } from '@foxy/utils'

	import { computed, StyleValue, toRef, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IBadgeProps>(), {
		tag: 'div',
		location: 'top right',
		label: 'foxy.badge',
		transition: () => ({component: FoxyScaleRotate}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IBadgeProps>(props)
	const {t} = useLocale()

	const attrs = useAttrs()

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
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
			'foxy-badge',
			{
				'foxy-badge--dot': props.dot,
				'foxy-badge--floating': props.floating,
				'foxy-badge--inline': props.inline
			},
			roundedClasses.value,
			borderClasses.value,
			statusClasses.value,
			props.class
		]
	})

	const badgeContentStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			props.inline ? {} : locationStyles.value
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
	.foxy-badge {
		$this: &;

		display: inline-block;
		line-height: 1;

		&__wrapper {
			display: flex;
			position: relative;
		}

		&__badge {
			align-items: center;
			display: inline-flex;
			border-radius: 10px;
			font-size: 0.75rem;
			font-weight: 500;
			height: 1.25rem;
			justify-content: center;
			min-width: 20px;
			padding: 4px 6px;
			pointer-events: auto;
			position: absolute;
			text-align: center;
			text-indent: 0;
			transition: 0.225s cubic-bezier(0.4, 0, 0.2, 1);
			white-space: nowrap;

			:deep(.foxy-icon) {
				color: inherit;
				font-size: 0.75rem;
				margin: 0 -2px;
			}

			:deep(img),
			:deep(.foxy-img) {
				height: 100%;
				width: 100%;
			}
		}

		&--bordered {
			#{$this}__badge {
				&:after {
					border-radius: inherit;
					border-style: solid;
					border-width: 2px;
					bottom: 0;
					color: rgb(var(--v-theme-background));
					content: "";
					left: 0;
					position: absolute;
					right: 0;
					top: 0;
					transform: scale(1.05);
				}
			}
		}

		&--dot {
			#{$this}__badge {
				border-radius: 4.5px;
				height: 9px;
				min-width: 0;
				padding: 0;
				width: 9px;

				&:after {
					border-width: 1.5px;
				}
			}
		}

		&--inline {
			#{$this}__badge {
				position: relative;
				vertical-align: middle;
			}

			#{$this}__wrapper {
				align-items: center;
				display: inline-flex;
				justify-content: center;
				margin: 0 4px;
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
