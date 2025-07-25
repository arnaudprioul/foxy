<template>
	<component
			:is="link.tag"
			:aria-current="isActive ? 'page' : undefined"
			:class="breadcrumbItemClasses"
			:href="link.href"
			:style="breadcrumbItemStyles"
			@click="link.navigate"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<template v-if="hasPrepend">
      <span
		      key="prepend"
		      class="origam-breadcrumbs__prepend"
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
		</template>

		<slot name="default">
			<span>{{ title }}</span>
		</slot>

		<template v-if="hasAppend">
      <span
		      key="append"
		      class="origam-breadcrumbs__append"
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
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamAvatar, OrigamIcon } from '../../components'

	import {
		useActive,
		useAdjacent,
		useBorder,
		useColorEffect,
		useDensity,
		useHover,
		useLink,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useStyle
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IBreadcrumbItemProps } from '../../interfaces'

	import { computed, ComputedRef, StyleValue, toRef, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbItemProps>(), {tag: 'span', density: DENSITY.DEFAULT})

	defineEmits(['click:append', 'click:prepend', 'click:append'])

	const {filterProps} = useProps<IBreadcrumbItemProps>(props)

	const attrs = useAttrs()

	const link = useLink(props, attrs)

	const {isHover, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave} = useHover(props)
	const {isActive: active, activeClasses} = useActive(props)

	const isActive = computed(() => {
		return active.value || link.isActive?.value
	})

	const {colorStyles} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const {
		hasAppend,
		hasPrepend,
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	// CLASS & STYLES

	const breadcrumbItemStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const breadcrumbItemClasses = computed(() => {
		return [
			'origam-breadcrumb-item',
			{
				'origam-breadcrumb-item--link': !!link.href.value,
				'origam-breadcrumb-item--disabled': props.disabled
			},
			activeClasses.value,
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(breadcrumbItemStyles)

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
	.origam-breadcrumb-item {
		align-items: center;
		display: inline-flex;
		vertical-align: middle;

		text-decoration: var(--origam-breadcrumb-item---text-decoration);

		transition: var(--origam-breadcrumb-item---transition);

		background: var(--origam-breadcrumb-item---background);
		box-shadow: var(--origam-breadcrumb-item---box-shadow);
		color: var(--origam-breadcrumb-item---color);
		opacity: var(--origam-breadcrumb-item---opacity);

		border-color: var(--origam-breadcrumb-item---border-color);
		border-style: var(--origam-breadcrumb-item---border-style);
		border-width: var(--origam-breadcrumb-item---border-width);
		border-radius: var(--origam-breadcrumb-item---border-radius);

		padding-block-start: calc(var(--origam-breadcrumb-item---padding-block-start) - var(--origam-breadcrumb-item---density));
		padding-block-end: calc(var(--origam-breadcrumb-item---padding-block-end) - var(--origam-breadcrumb-item---density));
		padding-inline-start: calc(var(--origam-breadcrumb-item---padding-inline-start) - var(--origam-breadcrumb-item---density));
		padding-inline-end: calc(var(--origam-breadcrumb-item---padding-inline-end) - var(--origam-breadcrumb-item---density));

		margin-block-start: var(--origam-breadcrumb-item---margin-block-start);
		margin-block-end: var(--origam-breadcrumb-item---margin-block-end);
		margin-inline-start: var(--origam-breadcrumb-item---margin-inline-start);
		margin-inline-end: var(--origam-breadcrumb-item---margin-inline-end);

		&--disabled {
			--origam-breadcrumb-item---opacity: 0.5;
			pointer-events: none;
		}

		&--link {

		}

		&--density-comfortable {
			--origam-breadcrumb-item---density: 8px;
		}

		&--density-default {
			--origam-breadcrumb-item---density: 0px;
		}

		&--density-compact {
			--origam-breadcrumb-item---density: 8px;
		}

		&__prepend,
		&__append {
			align-items: center;
			display: inline-flex;
		}
	}
</style>

<style>
	:root {
		--origam-breadcrumb-item---text-decoration: none;
		--origam-breadcrumb-item---border-top-width: 0;
		--origam-breadcrumb-item---border-left-width: 0;
		--origam-breadcrumb-item---border-bottom-width: 0;
		--origam-breadcrumb-item---border-right-width: 0;
		--origam-breadcrumb-item---border-width: var(--origam-breadcrumb-item---border-top-width) var(--origam-breadcrumb-item---border-left-width) var(--origam-breadcrumb-item---border-bottom-width) var(--origam-breadcrumb-item---border-right-width);
		--origam-breadcrumb-item---border-color: currentColor;
		--origam-breadcrumb-item---border-style: solid;
		--origam-breadcrumb-item---border-radius: 0;
		--origam-breadcrumb-item---density: 0;
		--origam-breadcrumb-item---box-shadow: none;
		--origam-breadcrumb-item---color: inherit;
		--origam-breadcrumb-item---opacity: 1;
		--origam-breadcrumb-item---background: transparent;
		--origam-breadcrumb-item---margin-inline-start: 0;
		--origam-breadcrumb-item---margin-inline-end: 0;
		--origam-breadcrumb-item---margin-block-start: 0;
		--origam-breadcrumb-item---margin-block-end: 0;
		--origam-breadcrumb-item---padding-block-start: 8px;
		--origam-breadcrumb-item---padding-block-end: 8px;
		--origam-breadcrumb-item---padding-inline-start: 8px;
		--origam-breadcrumb-item---padding-inline-end: 8px;
		--origam-breadcrumb-item---transition-duration: 0.2s, 0.1s;
		--origam-breadcrumb-item---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-breadcrumb-item---transition-property: transform, color;
		--origam-breadcrumb-item---transition: var(--origam-breadcrumb-item---transition-property) var(--origam-breadcrumb-item---transition-duration) var(--origam-breadcrumb-item---transition-timing-function);
	}
</style>
