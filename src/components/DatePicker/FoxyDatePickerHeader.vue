<template>
	<div
			:class="datePickerHeaderClasses"
			:style="datePickerHeaderStyles"
			@click="handleClick"
	>
		<template v-if="hasPrepend">
			<div
					key="prepend"
					class="foxy-date-picker-header__prepend"
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
			</div>
		</template>

		<template v-if="hasContent">
			<foxy-transition
					key="content"
					:transition="transition"
			>
				<div
						:key="header"
						class="foxy-date-picker-header__content"
				>
					<slot name="default">
						{{ header }}
					</slot>
				</div>
			</foxy-transition>
		</template>

		<template v-if="hasAppend">
			<div
					key="append"
					class="foxy-date-picker-header__append"
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
			</div>
		</template>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyIcon, FoxyTransition } from "@foxy/components"

	import { useAdjacent, useDensity, useProps } from "@foxy/composables"

	import type { IDatePickerHeaderProps } from "@foxy/interfaces"

	import { computed, StyleValue, toRef, useSlots } from "vue"

	const props = withDefaults(defineProps<IDatePickerHeaderProps>(), {})

	const emits = defineEmits(['click'])

	const {filterProps} = useProps<IDatePickerHeaderProps>(props)

	const slots = useSlots()

	const {densityClasses} = useDensity(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const hasContent = computed(() => {
		return !!(slots.default || props.header)
	})

	const handleClick = () => {
		emits('click')
	}

	// CLASS & STYLES

	const datePickerHeaderStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const datePickerHeaderClasses = computed(() => {
		return [
			'foxy-date-picker-header',
			densityClasses.value,
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
	.foxy-date-picker-header {
		$this: &;

		align-items: flex-end;
		height: 70px;
		display: grid;
		grid-template-areas: "prepend content append";
		grid-template-columns: min-content minmax(0, 1fr) min-content;
		overflow: hidden;
		padding-inline: 24px 12px;
		padding-bottom: 12px;

		&__append {
			grid-area: append;
		}

		&__prepend {
			grid-area: prepend;
			padding-inline-start: 8px;
		}

		&__content {
			align-items: center;
			display: inline-flex;
			font-size: 32px;
			line-height: 40px;
			grid-area: content;
			justify-content: space-between;
		}

		&--clickable {
			#{$this}__content {
				cursor: pointer;

				&:not(:hover) {
					opacity: .7
				}
			}
		}
	}
</style>
