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
		      class="foxui-breadcrumbs__prepend"
		      @click="handleClickPrepend"
      >
        <slot name="prepend">
          <foxui-avatar
		          v-if="prependAvatar"
		          key="prepend-avatar"
		          :density="density"
		          :image="prependAvatar"
          />
          <foxui-icon
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
		      class="foxui-breadcrumbs__append"
		      @click="handleClickAppend"
      >
       <slot name="append">
         <foxui-avatar
		         v-if="appendAvatar"
		         key="append-avatar"
		         :density="density"
		         :image="appendAvatar"
         />
         <foxui-icon
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
	import { FoxuiAvatar, FoxuiIcon } from '@foxui/components'

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
	} from '@foxui/composables'

	import { DENSITY } from '@foxui/enums'

	import type { IBreadcrumbItemProps } from '@foxui/interfaces'

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
			'foxui-breadcrumb-item',
			{
				'foxui-breadcrumb-item--link': !!link.href.value,
				'foxui-breadcrumb-item--disabled': props.disabled
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
	.foxui-breadcrumb-item {
		align-items: center;
		display: inline-flex;
		vertical-align: middle;

		text-decoration: var(--foxui-breadcrumb-item---text-decoration);

		transition: var(--foxui-breadcrumb-item---transition);

		background: var(--foxui-breadcrumb-item---background);
		box-shadow: var(--foxui-breadcrumb-item---box-shadow);
		color: var(--foxui-breadcrumb-item---color);
		opacity: var(--foxui-breadcrumb-item---opacity);

		border-color: var(--foxui-breadcrumb-item---border-color);
		border-style: var(--foxui-breadcrumb-item---border-style);
		border-width: var(--foxui-breadcrumb-item---border-width);
		border-radius: var(--foxui-breadcrumb-item---border-radius);

		padding-block-start: calc(var(--foxui-breadcrumb-item---padding-block-start) - var(--foxui-breadcrumb-item---density));
		padding-block-end: calc(var(--foxui-breadcrumb-item---padding-block-end) - var(--foxui-breadcrumb-item---density));
		padding-inline-start: calc(var(--foxui-breadcrumb-item---padding-inline-start) - var(--foxui-breadcrumb-item---density));
		padding-inline-end: calc(var(--foxui-breadcrumb-item---padding-inline-end) - var(--foxui-breadcrumb-item---density));

		margin-block-start: var(--foxui-breadcrumb-item---margin-block-start);
		margin-block-end: var(--foxui-breadcrumb-item---margin-block-end);
		margin-inline-start: var(--foxui-breadcrumb-item---margin-inline-start);
		margin-inline-end: var(--foxui-breadcrumb-item---margin-inline-end);

		&--disabled {
			--foxui-breadcrumb-item---opacity: 0.5;
			pointer-events: none;
		}

		&--link {

		}

		&--density-comfortable {
			--foxui-breadcrumb-item---density: 8px;
		}

		&--density-default {
			--foxui-breadcrumb-item---density: 0px;
		}

		&--density-compact {
			--foxui-breadcrumb-item---density: 8px;
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
		--foxui-breadcrumb-item---text-decoration: none;
		--foxui-breadcrumb-item---border-top-width: 0;
		--foxui-breadcrumb-item---border-left-width: 0;
		--foxui-breadcrumb-item---border-bottom-width: 0;
		--foxui-breadcrumb-item---border-right-width: 0;
		--foxui-breadcrumb-item---border-width: var(--foxui-breadcrumb-item---border-top-width) var(--foxui-breadcrumb-item---border-left-width) var(--foxui-breadcrumb-item---border-bottom-width) var(--foxui-breadcrumb-item---border-right-width);
		--foxui-breadcrumb-item---border-color: currentColor;
		--foxui-breadcrumb-item---border-style: solid;
		--foxui-breadcrumb-item---border-radius: 0;
		--foxui-breadcrumb-item---density: 0;
		--foxui-breadcrumb-item---box-shadow: none;
		--foxui-breadcrumb-item---color: inherit;
		--foxui-breadcrumb-item---opacity: 1;
		--foxui-breadcrumb-item---background: transparent;
		--foxui-breadcrumb-item---margin-inline-start: 0;
		--foxui-breadcrumb-item---margin-inline-end: 0;
		--foxui-breadcrumb-item---margin-block-start: 0;
		--foxui-breadcrumb-item---margin-block-end: 0;
		--foxui-breadcrumb-item---padding-block-start: 8px;
		--foxui-breadcrumb-item---padding-block-end: 8px;
		--foxui-breadcrumb-item---padding-inline-start: 8px;
		--foxui-breadcrumb-item---padding-inline-end: 8px;
		--foxui-breadcrumb-item---transition-duration: 0.2s, 0.1s;
		--foxui-breadcrumb-item---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-breadcrumb-item---transition-property: transform, color;
		--foxui-breadcrumb-item---transition: var(--foxui-breadcrumb-item---transition-property) var(--foxui-breadcrumb-item---transition-duration) var(--foxui-breadcrumb-item---transition-timing-function);
	}
</style>
