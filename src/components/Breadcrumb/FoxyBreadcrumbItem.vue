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
		      class="foxy-breadcrumbs__prepend"
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
      </span>
		</template>

		<slot name="default">
			<span>{{ title }}</span>
		</slot>

		<template v-if="hasAppend">
      <span
		      key="append"
		      class="foxy-breadcrumbs__append"
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
      </span>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyIcon } from '@foxy/components'

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
	} from '@foxy/composables'

	import { DENSITY } from '@foxy/enums'

	import type { IBreadcrumbItemProps } from '@foxy/interfaces'

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
			'foxy-breadcrumb-item',
			{
				'foxy-breadcrumb-item--link': !!link.href.value,
				'foxy-breadcrumb-item--disabled': props.disabled,
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
	.foxy-breadcrumb-item {
		align-items: center;
		display: inline-flex;
		vertical-align: middle;

		text-decoration: var(--foxy-breadcrumb-item---text-decoration);

		transition: var(--foxy-breadcrumb-item---transition);

		background: var(--foxy-breadcrumb-item---background);
		box-shadow: var(--foxy-breadcrumb-item---box-shadow);
		color: var(--foxy-breadcrumb-item---color);
		opacity: var(--foxy-breadcrumb-item---opacity);

		border-color: var(--foxy-breadcrumb-item---border-color);
		border-style: var(--foxy-breadcrumb-item---border-style);
		border-width: var(--foxy-breadcrumb-item---border-width);
		border-radius: var(--foxy-breadcrumb-item---border-radius);

		padding-block-start: calc(var(--foxy-breadcrumb-item---padding-block-start) - var(--foxy-breadcrumb-item---density));
		padding-block-end: calc(var(--foxy-breadcrumb-item---padding-block-end) - var(--foxy-breadcrumb-item---density));
		padding-inline-start: calc(var(--foxy-breadcrumb-item---padding-inline-start) - var(--foxy-breadcrumb-item---density));
		padding-inline-end: calc(var(--foxy-breadcrumb-item---padding-inline-end) - var(--foxy-breadcrumb-item---density));

		margin-block-start: var(--foxy-breadcrumb-item---margin-block-start);
		margin-block-end: var(--foxy-breadcrumb-item---margin-block-end);
		margin-inline-start: var(--foxy-breadcrumb-item---margin-inline-start);
		margin-inline-end: var(--foxy-breadcrumb-item---margin-inline-end);

		&--disabled {
			--foxy-breadcrumb-item---opacity: 0.5;
			pointer-events: none;
		}

		&--link {

		}

		&--density-default {
			--foxy-breadcrumb-item---density: 0px;
		}

		&--density-compact {
			--foxy-breadcrumb-item---density: 8px;
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
		--foxy-breadcrumb-item---text-decoration: none;
		--foxy-breadcrumb-item---border-top-width: 0;
		--foxy-breadcrumb-item---border-left-width: 0;
		--foxy-breadcrumb-item---border-bottom-width: 0;
		--foxy-breadcrumb-item---border-right-width: 0;
		--foxy-breadcrumb-item---border-width: var(--foxy-breadcrumb-item---border-top-width) var(--foxy-breadcrumb-item---border-left-width) var(--foxy-breadcrumb-item---border-bottom-width) var(--foxy-breadcrumb-item---border-right-width);
		--foxy-breadcrumb-item---border-color: currentColor;
		--foxy-breadcrumb-item---border-style: solid;
		--foxy-breadcrumb-item---border-radius: 0;
		--foxy-breadcrumb-item---density: 0;
		--foxy-breadcrumb-item---box-shadow: none;
		--foxy-breadcrumb-item---color: inherit;
		--foxy-breadcrumb-item---opacity: 1;
		--foxy-breadcrumb-item---background: transparent;
		--foxy-breadcrumb-item---margin-inline-start: 0;
		--foxy-breadcrumb-item---margin-inline-end: 0;
		--foxy-breadcrumb-item---margin-block-start: 0;
		--foxy-breadcrumb-item---margin-block-end: 0;
		--foxy-breadcrumb-item---padding-block-start: 8px;
		--foxy-breadcrumb-item---padding-block-end: 8px;
		--foxy-breadcrumb-item---padding-inline-start: 8px;
		--foxy-breadcrumb-item---padding-inline-end: 8px;
		--foxy-breadcrumb-item---transition-duration: 0.2s, 0.1s;
		--foxy-breadcrumb-item---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-breadcrumb-item---transition-property: transform, color;
		--foxy-breadcrumb-item---transition: var(--foxy-breadcrumb-item---transition-property) var(--foxy-breadcrumb-item---transition-duration) var(--foxy-breadcrumb-item---transition-timing-function);
	}
</style>
