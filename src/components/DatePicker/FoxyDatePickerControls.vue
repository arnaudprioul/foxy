<template>
	<div
		:class="datePickerControlsClasses"
		:style="datePickerControlsStyles"
		>
		<foxy-btn
				class="foxy-date-picker-controls__month-btn"
				:disabled="disableMonth"
				:text="text"
				rounded
				@click="handleClickMonth"
		/>

		<foxy-btn
				key="mode-btn"
				class="foxy-date-picker-controls__mode-btn"
				:disabled="disableYear"
				:icon="modeIcon"
				@click="handleClickYear"
		/>

		<foxy-spacer key="mode-spacer" />

		<div
				key="month-buttons"
				class="foxy-date-picker-controls__month"
		>
			<foxy-btn
					:disabled="disablePrev"
					:icon="prevIcon"
					@click="handleClickPrev"
			/>

			<foxy-btn
					:disabled="disableNext"
					:icon="nextIcon"
					@click="handleClickNext"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { FoxyBtn, FoxySpacer } from "@foxy/components"

	import { useProps } from "@foxy/composables"

	import { DATE_MODE, MDI_ICONS } from "@foxy/enums"

	import { IDatePickerControlsProps } from "@foxy/interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<IDatePickerControlsProps>(), {
		nextIcon: MDI_ICONS.CHEVRON_RIGHT,
		prevIcon: MDI_ICONS.CHEVRON_LEFT,
		modeIcon: MDI_ICONS.MENU_DOWN_OUTLINE,
		viewMode: DATE_MODE.MONTH
	})

	const emits = defineEmits(['click:year', 'click:month', 'click:prev', 'click:next', 'click:text',])

	const {filterProps} = useProps<IDatePickerControlsProps>(props)

	const disableMonth = computed(() => {
		return Array.isArray(props.disabled)
				? props.disabled.includes('text')
				: !!props.disabled
	})
	const disableYear = computed(() => {
		return Array.isArray(props.disabled)
				? props.disabled.includes('mode')
				: !!props.disabled
	})
	const disablePrev = computed(() => {
		return Array.isArray(props.disabled)
				? props.disabled.includes('prev')
				: !!props.disabled
	})
	const disableNext = computed(() => {
		return Array.isArray(props.disabled)
				? props.disabled.includes('next')
				: !!props.disabled
	})

	const handleClickPrev = () => {
		emits('click:prev')
	}
	const handleClickNext = () => {
		emits('click:next')
	}
	const handleClickYear = () => {
		emits('click:year')
	}
	const handleClickMonth = () => {
		emits('click:month')
	}

	// CLASS & STYLES

	const datePickerControlsStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const datePickerControlsClasses = computed(() => {
		return [
			'foxy-date-picker-controls',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style scoped lang="scss">
	.foxy-date-picker-controls {
		$this: &;

		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: .875rem;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-inline-start:6px;
		padding-inline-end:12px;


		> :deep(.foxy-btn){
			&:first-child {
				text-transform: none;
				font-weight: 400;
				line-height: initial;
				letter-spacing: initial;
			}

			&:last-child {
				margin-inline-start:4px;
			}
		}

		&__date {
			margin-inline-end:4px;
		}

		&__month {
			display: flex;
		}
	}
</style>
