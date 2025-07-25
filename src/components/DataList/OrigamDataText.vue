<template>
	<dd
			:class="dataTextClasses"
			:style="dataTextStyles"
	>
    <span
		    v-if="hasPrepend"
		    key="prepend"
		    class="origam-data-text__prepend"
		    @click="handleClickPrepend"
    >
      <slot name="prepend">
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
				class="origam-data-text__content"
				data-no-activator=""
		>
      <slot name="default">
        {{ text }}
      </slot>
    </span>

		<span
				v-if="hasAppend"
				key="append"
				class="origam-data-text__append"
				@click="handleClickAppend"
		>
      <slot name="append">
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
     </slot>
    </span>
	</dd>
</template>

<script
		lang="ts"
		setup
>

	import { OrigamAvatar, OrigamIcon } from "../../components"
	import { useAdjacent, useBothColor, useDensity, useMargin, usePadding, useProps } from "../../composables"

	import type { IDataTextProps } from "../../interfaces"
	import { computed, shallowRef, StyleValue, toRef } from "vue"

	const props = withDefaults(defineProps<IDataTextProps>(), {})

	const {filterProps} = useProps<IDataTextProps>(props)

	const {densityClasses} = useDensity(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isHover = shallowRef(false)

	const hoverColor = computed(() => {
		return props.hoverColor ?? props.color
	})
	const color = computed(() => {
		return isHover.value ? hoverColor.value : props.color
	})
	const hoverBgColor = computed(() => {
		return props.hoverBgColor ?? props.color
	})
	const bgColor = computed(() => {
		return isHover.value ? hoverBgColor.value : props.bgColor
	})

	const {colorStyles} = useBothColor(bgColor, color)

	// CLASS & STYLES

	const dataTextStyles = computed(() => {
		return [
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const dataTextClasses = computed(() => {
		return [
			'origam-data-text',
			paddingClasses.value,
			marginClasses.value,
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

</style>
