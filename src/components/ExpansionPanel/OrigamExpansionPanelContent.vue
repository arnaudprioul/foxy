<template>
	<origam-expand-y @after-leave="handleAfterLeave">
		<component
				:is="tag"
				v-show="isSelected"
				:class="expansionPanelContentClasses"
				:style="expansionPanelContentStyles"
		>
			<div class="origam-expansion-panel-content__wrapper">
				<template v-if="hasContent">
					<slot name="default">
						<template v-if="isComponent">
							<component :is="content"/>
						</template>

						<template v-else>
							{{ content }}
						</template>
					</slot>
				</template>
			</div>
		</component>
	</origam-expand-y>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue, toRef } from 'vue'
	import { OrigamExpandY } from '../../components'

	import {
		useBorder,
		useBothColor,
		useDensity,
		useLazy,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { ORIGAM_EXPANSION_PANEL_KEY } from '../../consts'

	import type { IExpansionPanelContentProps } from '../../interfaces'

	const props = withDefaults(defineProps<IExpansionPanelContentProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<IExpansionPanelContentProps>(props)

	const expansionPanel = inject(ORIGAM_EXPANSION_PANEL_KEY)

	if (!expansionPanel) throw new Error('[Origam] expansion-panel-content needs to be placed inside expansion-panel')

	const {hasContent, onAfterLeave: handleAfterLeave} = useLazy(props, expansionPanel.isSelected)

	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)

	const isSelected = computed(() => {
		return expansionPanel.isSelected.value
	})
	const isComponent = computed(() => {
		return typeof props.content !== 'string'
	})

	// CLASSES & STYLES

	const expansionPanelContentStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelContentClasses = computed(() => {
		return [
			'origam-expansion-panel-content',
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
	.origam-expansion-panel-content {
		display: flex;

		&__wrapper {
			padding: 8px 24px 16px;
			flex: 1 1 auto;
			max-width: 100%;
		}
	}
</style>

<style>
	:root {

	}
</style>
