<template>
	<component
			:is="tag"
			v-ripple="props.ripple"
			:aria-expanded="isSelected"
			:class="expansionPanelHeaderClasses"
			:disabled="isDisabled"
			:style="expansionPanelHeaderStyles"
			:tabindex="isDisabled ? -1 : undefined"
			type="button"
			@click="handleExpand"
	>
		<span class="origam-expansion-panel-header__overlay"/>

		<div class="origam-expansion-panel-header__wrapper">
      <span
		      v-if="hasPrepend"
		      key="prepend"
		      class="origam-expansion-panel-header__prepend"
		      @click="handleClickPrepend"
      >
        <slot
		        name="prepend"
		        v-bind="slotProps"
        >
          <origam-avatar
		          v-if="prependAvatar"
		          key="prepend-avatar"
		          :density="density"
		          :image="prependAvatar"
          />
          <origam-icon
		          v-if="prependIcon"
		          key="prepend-icon"
		          :density="density"
		          :icon="prependIcon"
          />
        </slot>
      </span>

			<span
					v-if="hasTitle"
					class="origam-expansion-panel-header__title"
			>
        <slot
		        name="default"
		        v-bind="slotProps"
        >
          {{ title }}
        </slot>
      </span>

			<span
					v-if="hasAppend || !props.hideActions"
					key="append"
					class="origam-expansion-panel-header__append"
					@click="handleClickAppend"
			>
        <slot
		        name="append"
		        v-bind="slotProps"
        >
          <origam-avatar
		          v-if="appendAvatar"
		          key="append-avatar"
		          :density="density"
		          :image="appendAvatar"
          />
          <origam-icon
		          v-if="appendIcon"
		          key="append-icon"
		          :density="density"
		          :icon="appendIcon"
          />
          <origam-icon
		          v-if="!props.hideActions"
		          :icon="isSelected ? collapseIcon : expandIcon"
          />
        </slot>
      </span>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue, toRef, useSlots } from 'vue'
	import { OrigamAvatar, OrigamIcon } from '../../components'

	import {
		useAdjacent,
		useBorder,
		useBothColor,
		useDensity,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { ORIGAM_EXPANSION_PANEL_KEY } from '../../consts'

	import { vRipple } from '../../directives'

	import { MDI_ICONS } from "../../enums"

	import type { IExpansionPanelHeaderProps } from '../../interfaces'

	const props = withDefaults(defineProps<IExpansionPanelHeaderProps>(), {
		tag: 'button',
		expandIcon: MDI_ICONS.CHEVRON_DOWN,
		collapseIcon: MDI_ICONS.CHEVRON_UP
	})

	defineEmits(['click:append', 'click:prepend'])

	const {filterProps} = useProps<IExpansionPanelHeaderProps>(props)

	const expansionPanel = inject(ORIGAM_EXPANSION_PANEL_KEY)

	if (!expansionPanel) throw new Error('[Origam] expansion-panel-content needs to be placed inside expansion-panel')

	const slots = useSlots()

	const {
		hasAppend,
		hasPrepend,
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)

	const handleExpand = () => {
		if (!props.readonly) {
			expansionPanel.toggle()
		}
	}

	const isSelected = computed(() => {
		return expansionPanel.isSelected.value
	})
	const isDisabled = computed(() => {
		return expansionPanel.disabled.value
	})

	const slotProps = computed(() => {
		return {
			collapseIcon: props.collapseIcon,
			disabled: expansionPanel.disabled.value,
			expanded: expansionPanel.isSelected.value,
			expandIcon: props.expandIcon,
			readonly: props.readonly
		}
	})

	const hasTitle = computed(() => {
		return slots.default || props.title
	})

	// CLASSES & STYLES

	const expansionPanelHeaderStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelHeaderClasses = computed(() => {
		return [
			'origam-expansion-panel-header',
			{
				'origam-expansion-panel-header--active': expansionPanel.isSelected.value,
				'origam-expansion-panel-header--focusable': props.focusable,
				'origam-expansion-panel-header--static': props.static
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			roundedClasses.value,
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
	.origam-expansion-panel-header {
		$this: &;

		outline: none;
		border-radius: inherit;
		font-size: 0.9375rem;
		line-height: 1;
		min-height: 48px;
		width: 100%;
		border: none;

		&__wrapper {
			align-items: center;
			text-align: start;
			display: flex;
			width: 100%;
			height: 100%;
			padding: 16px 24px;
			position: relative;
			transition: 0.3s min-height cubic-bezier(0.4, 0, 0.2, 1);
			justify-content: space-between;
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: currentColor;
			border-radius: inherit;
			opacity: 0;
		}

		&__append,
		&__prepend {
			display: inline-flex;
			margin-bottom: -4px;
			margin-top: -4px;
			user-select: none;
		}

		&__append {
			margin-inline-start: auto;
		}

		&__prepend {
			margin-inline-end: 8px;
		}

		&:hover {
			&__overlay {
				opacity: calc(0.04 * 1);
			}
		}

		&:focus-visible,
		&:focus {
			&__overlay {
				opacity: calc(0.12 * 1);
			}
		}

		&--focusable {
			&#{$this}--active {

				&__overlay {
					opacity: calc(0.12 * 1);
				}

				&:hover {
					&__overlay {
						opacity: calc((0.12 + 0.04) * 1);
					}
				}

				&:focus-visible,
				&:focus {
					&__overlay {
						opacity: calc((0.12 + 0.12) * 1);
					}
				}
			}
		}
	}

</style>

<style>
	:root {

	}
</style>
