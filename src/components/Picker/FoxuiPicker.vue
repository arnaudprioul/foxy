<template>
	<foxui-sheet
			ref="foxuiSheetRef"
			:class="pickerClasses"
			:style="pickerStyles"
			v-bind="{ ...sheetProps }"
	>
		<template #default>
			<template v-if="!hideHeader">
				<div
						key="header"
						:style="backgroundColorStyles"
				>
					<template v-if="hasTitle">
						<slot name="title">
							<foxui-picker-title
									key="picker-title"
									:title="title"
									class="foxui-picker__title"
							/>
						</slot>
					</template>

					<template v-if="slots.header">
						<div class="foxui-picker__header">
							<slot name="header"/>
						</div>
					</template>
				</div>
			</template>

			<div class="foxui-picker__body">
				<slot name="default"/>
			</div>

			<template v-if="slots.actions">
				<div class="foxui-picker__actions">
					<slot name="actions"/>
				</div>
			</template>
		</template>
	</foxui-sheet>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiPickerTitle, FoxuiSheet } from "@foxui/components"

	import { useBackgroundColor, useProps } from "@foxui/composables"

	import type { IPickerProps } from "@foxui/interfaces"

	import type { TFoxuiSheet } from "@foxui/types"

	import { computed, ref, StyleValue, toRef, useSlots } from "vue"

	const props = withDefaults(defineProps<IPickerProps>(), {})

	const slots = useSlots()
	const {filterProps} = useProps<IPickerProps>(props)

	const {backgroundColorStyles} = useBackgroundColor(toRef(props, 'bgColor'))

	const hasTitle = computed(() => {
		return !!(props.title || slots.title)
	})

	const foxuiSheetRef = ref<TFoxuiSheet>()

	const sheetProps = computed(() => {
		return foxuiSheetRef.value?.filterProps(props, ['class', 'style'])
	})

	// CLASS & STYLES

	const pickerStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const pickerClasses = computed(() => {
		return [
			'foxui-picker',
			{
				'foxui-picker--landscape': props.landscape,
				'foxui-picker--has-actions': !!slots.actions
			},
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
	.foxui-picker {
		$this: &;

		display: grid;
		grid-auto-rows: min-content;
		grid-template-areas: "title" "header" "body";
		overflow: hidden;
		box-shadow: 0 0 0 0 var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, .2)), 0 0 0 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .14)), 0 0 0 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, .12));
		border-radius: 4px;

		&--landscape {
			grid-template-areas: "title" "header body" "header body";
		}

		&--has-actions {
			grid-template-areas: "title" "header" "body" "actions";

			&#{$this}--landscape {
				grid-template-areas: "title" "header body" "header actions"
			}
		}

		&__title {
			grid-area: title;
		}

		&__header {
			grid-area: header;
		}

		&__body {
			grid-area: body;
			overflow: hidden;
			position: relative;
		}

		&__actions {
			grid-area: actions;
			padding: 0 12px 12px;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			:deep(.foxui-btn) {
				min-width: 48px;

				&:not(:last-child) {
					margin-inline-end: 8px;
				}
			}
		}
	}
</style>
