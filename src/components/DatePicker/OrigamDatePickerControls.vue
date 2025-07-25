<template>
	<div
			:class="datePickerControlsClasses"
			:style="datePickerControlsStyles"
	>

		<origam-btn-group>
			<template #default>
				<origam-btn
						:disabled="disableMonth"
						:text="text"
						class="origam-date-picker-controls__month-btn"
						rounded="0"
						@click="handleClickMonth"
				/>

				<origam-btn
						key="mode-btn"
						:disabled="disableYear"
						:icon="modeIcon"
						class="origam-date-picker-controls__mode-btn"
						rounded="0"
						@click="handleClickYear"
				/>
			</template>
		</origam-btn-group>

		<origam-spacer key="mode-spacer"/>

		<div
				key="month-buttons"
				class="origam-date-picker-controls__month"
		>
			<origam-btn-group>
				<template #default>
					<origam-btn
							:disabled="disablePrev"
							:icon="prevIcon"
							:rounded="0"
							@click="handleClickPrev"
					/>

					<origam-btn
							:disabled="disableNext"
							:icon="nextIcon"
							:rounded="0"
							@click="handleClickNext"
					/>
				</template>
			</origam-btn-group>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamBtnGroup, OrigamSpacer } from "../../components"

	import { useProps } from "../../composables"

	import { DATE_MODE, MDI_ICONS } from "../../enums"

	import type { IDatePickerControlsProps } from "../../interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<IDatePickerControlsProps>(), {
		nextIcon: MDI_ICONS.CHEVRON_RIGHT,
		prevIcon: MDI_ICONS.CHEVRON_LEFT,
		modeIcon: MDI_ICONS.MENU_DOWN_OUTLINE,
		viewMode: DATE_MODE.MONTH
	})

	const emits = defineEmits(['click:year', 'click:month', 'click:prev', 'click:next', 'click:text'])

	const {filterProps} = useProps<IDatePickerControlsProps>(props)

	const disableMonth = computed(() => {
		return props.disabled || props.disabledMonth
	})
	const disableYear = computed(() => {
		return props.disabled || props.disabledYear
	})
	const disablePrev = computed(() => {
		return props.disabled || props.disabledPrev
	})
	const disableNext = computed(() => {
		return props.disabled || props.disabledNext
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
			'origam-date-picker-controls',
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
	.origam-date-picker-controls {
		$this: &;

		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: .875rem;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-inline-start: 6px;
		padding-inline-end: 12px;


		> :deep(.origam-btn) {
			&:first-child {
				text-transform: none;
				font-weight: 400;
				line-height: initial;
				letter-spacing: initial;
			}

			&:last-child {
				margin-inline-start: 4px;
			}
		}

		&__date {
			margin-inline-end: 4px;
		}

		&__month {
			display: flex;
		}
	}
</style>
