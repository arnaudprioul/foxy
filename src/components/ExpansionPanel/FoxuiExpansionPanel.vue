<template>
	<component
			:is="tag"
			:class="expansionPanelClasses"
			:style="expansionPanelStyles"
	>
		<div
				:class="[...elevationClasses]"
				class="foxui-expansion-panel__shadow"
		/>

		<template v-if="hasHeader">
			<slot
					name="header"
					v-bind="expansionPanelHeaderProps"
			>
				<foxui-expansion-panel-header
						key="header"
						ref="foxuiExpansionPanelHeaderRef"
						class="foxui-expansion-panel__header"
						v-bind="expansionPanelHeaderProps"
				>
					<template
							v-if="slots.prepend"
							#prepend="prependSlotProps"
					>
						<slot
								name="prepend"
								v-bind="prependSlotProps"
						/>
					</template>

					<template
							v-if="slots.title"
							#title="titleSlotProps"
					>
						<slot
								name="title"
								v-bind="titleSlotProps"
						>
							{{ title }}
						</slot>
					</template>

					<template
							v-if="slots.append"
							#append="appendSlotProps"
					>
						<slot
								name="append"
								v-bind="appendSlotProps"
						/>
					</template>
				</foxui-expansion-panel-header>
			</slot>
		</template>

		<template v-if="hasContent">
			<slot
					name="wrapper"
					v-bind="expansionPanelContentProps"
			>
				<foxui-expansion-panel-content
						key="content"
						ref="foxuiExpansionPanelContentRef"
						class="foxui-expansion-panel__content"
						v-bind="expansionPanelContentProps"
				>
					<template
							v-if="slots.default"
							#default
					>
						<slot name="default"/>
					</template>
				</foxui-expansion-panel-content>
			</slot>
		</template>

		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiExpansionPanelContent, FoxuiExpansionPanelHeader } from '@foxui/components'

	import {
		useBorder,
		useBothColor,
		useDensity,
		useElevation,
		useGroupItem,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '@foxui/composables'

	import { FOXUI_EXPANSION_PANEL_KEY } from '@foxui/consts'

	import type { IExpansionPanelProps } from '@foxui/interfaces'

	import type { TFoxuiExpansionPanelContent, TFoxuiExpansionPanelHeader } from "@foxui/types"

	import { computed, provide, ref, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<IExpansionPanelProps>(), {
		tag: 'div'
	})

	defineEmits(['group:selected'])

	const {filterProps} = useProps<IExpansionPanelProps>(props)

	const foxuiExpansionPanelHeaderRef = ref<TFoxuiExpansionPanelHeader>()
	const foxuiExpansionPanelContentRef = ref<TFoxuiExpansionPanelContent>()

	const groupItem = useGroupItem(props, FOXUI_EXPANSION_PANEL_KEY)
	const slots = useSlots()

	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)

	const isDisabled = computed(() => {
		return groupItem?.disabled.value || props.disabled
	})

	const selectedIndices = computed(() => {
		return groupItem?.group.items.value.reduce<number[]>((arr, item, index) => {
			if (groupItem?.group.selected.value.includes(item.id)) {
				arr.push(index)
			}

			return arr
		}, [])
	})

	const isBeforeSelected = computed(() => {
		const index = groupItem?.group.items.value.findIndex((item) => {
			return item.id === groupItem?.id
		}) ?? -1

		return !groupItem?.isSelected.value && selectedIndices.value?.some((selectedIndex) => {
			return selectedIndex - index === 1
		})
	})
	const isAfterSelected = computed(() => {
		const index = groupItem?.group.items.value.findIndex((item) => {
			return item.id === groupItem?.id
		}) ?? -1

		return !groupItem?.isSelected.value && selectedIndices.value?.some((selectedIndex) => {
			return selectedIndex - index === -1
		})
	})

	if (groupItem !== null) {
		provide(FOXUI_EXPANSION_PANEL_KEY, groupItem)
	}

	const hasContent = computed(() => {
		return slots.content || !!props.content
	})
	const hasHeader = computed(() => {
		return slots.header || slots.title || slots.prepend || slots.append || !!props.title
	})

	const expansionPanelHeaderProps = computed(() => {
		return foxuiExpansionPanelHeaderRef.value?.filterProps(props, ['class', 'id', 'style', 'tag'])
	})
	const expansionPanelContentProps = computed(() => {
		return foxuiExpansionPanelContentRef.value?.filterProps(props, ['class', 'id', 'style', 'tag'])
	})

	// CLASSES & STYLES

	const expansionPanelStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelClasses = computed(() => {
		return [
			'foxui-expansion-panel',
			{
				'foxui-expansion-panel--active': groupItem?.isSelected.value,
				'foxui-expansion-panel--before-active': isBeforeSelected.value,
				'foxui-expansion-panel--after-active': isAfterSelected.value,
				'foxui-expansion-panel--disabled': isDisabled.value
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
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
	// TODO - Rework with css variables
	.foxui-expansion-panel {
		flex: 1 0 100%;
		max-width: 100%;
		position: relative;
		transition: 0.3s all cubic-bezier(0.4, 0, 0.2, 1);
		transition-property: margin-top, border-radius, border, max-width;
		border-radius: 4px;

		&:not(:first-child) {
			&:after {
				border-top-style: solid;
				border-top-width: thin;
				border-top-color: rgba(33, 33, 33, 0.12);
				content: "";
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
				transition: 0.3s opacity cubic-bezier(0.4, 0, 0.2, 1);
			}
		}

		&--disabled {
			:deep(.foxui-expansion-panel-header) {
				color: rgba(0, 0, 0, 0.26);
				pointer-events: none;

				.foxui-expansion-panel-header__overlay {
					opacity: 0.4615384615;
				}
			}
		}

		&--active {
			&:not(:first-child),
			+ .foxui-expansion-panel {
				margin-top: 16px;

				&:after {
					opacity: 0;
				}
			}

			:deep(.foxui-expansion-panel-header) {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;

				&:not(.v-expansion-panel-title--static) {
					min-height: 64px;
				}
			}
		}

		&__shadow {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
			border-radius: inherit;
			z-index: -1;
		}
	}
</style>

<style>
	:root {

	}
</style>
