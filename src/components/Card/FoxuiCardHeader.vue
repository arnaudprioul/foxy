<template>
	<component
			:is="tag"
			:class="cardHeaderClasses"
			:style="cardHeaderStyles"
			v-bind="$attrs"
	>
    <span
		    key="underlay"
		    class="foxui-card-header__underlay"
    />

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="foxui-card-header__prepend"
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
			</div>

			<div
					class="foxui-card-header__content"
					data-no-activator=""
			>
				<div
						v-if="hasTitle"
						key="title"
						class="foxui-card-header__title"
				>
					<slot
							name="title"
							v-bind="{ title }"
					>{{ title }}
					</slot>
				</div>

				<div
						v-if="hasSubtitle"
						key="subtitle"
						class="foxui-card-header__subtitle"
				>
					<slot
							name="subtitle"
							v-bind="{ subtitle }"
					>{{ subtitle }}
					</slot>
				</div>

				<slot name="default"/>
			</div>

			<div
					v-if="hasAppend"
					key="append"
					class="foxui-card-header__append"
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
			</div>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiAvatar, FoxuiIcon } from '@foxui/components'

	import { useAdjacent, useDensity, useProps } from '@foxui/composables'

	import type { ICardHeaderProps } from '@foxui/interfaces'

	import { computed, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICardHeaderProps>(), {tag: 'FoxuiToolbar'})

	defineEmits(['click:prepend', 'click:append'])

	const {filterProps} = useProps<ICardHeaderProps>(props)

	const slots = useSlots()
	const {densityClasses} = useDensity(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasPrepend,
		hasAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const hasTitle = computed(() => {
		return slots.title || props.title != null
	})
	const hasSubtitle = computed(() => {
		return slots.subtitle || props.subtitle != null
	})

	// CLASS & STYLES

	const cardHeaderStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const cardHeaderClasses = computed(() => {
		return [
			'foxui-card-header',
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
	.foxui-card-header {
		$this: &;

		align-items: var(--foxui-card-header---align-items);
		display: var(--foxui-card-header---display);
		flex: var(--foxui-card-header---flex);
		grid-template-areas: var(--foxui-card-header---grid-template-areas);
		grid-template-columns: var(--foxui-card-header---grid-template-columns);

		max-width: var(--foxui-card-header---max-width);
		min-height: calc(var(--foxui-card-header---min-height) + var(--foxui-card-header---density));
		box-sizing: var(--foxui-card-header---box-sizing);

		text-decoration: var(--foxui-card-header---text-decoration);

		outline: var(--foxui-card-header---outline);
		position: var(--foxui-card-header---position);

		padding-block-start: calc(var(--foxui-card-header---padding-block-start) + var(--foxui-card-header---density));
		padding-block-end: calc(var(--foxui-card-header---padding-block-end) + var(--foxui-card-header---density));
		padding-inline-start: calc(var(--foxui-card-header---padding-inline-start) + var(--foxui-card-header---density));
		padding-inline-end: calc(var(--foxui-card-header---padding-inline-end) + var(--foxui-card-header---density));

		margin-block-start: var(--foxui-card-header---margin-block-start);
		margin-block-end: var(--foxui-card-header---margin-block-end);
		margin-inline-start: var(--foxui-card-header---margin-inline-start);
		margin-inline-end: var(--foxui-card-header---margin-inline-end);

		border-color: var(--foxui-card-header---border-color);
		border-style: var(--foxui-card-header---border-style);
		border-width: var(--foxui-card-header---border-width);
		border-radius: var(--foxui-card-header---border-radius);

		&--border {
			--foxui-card-header---border-width: thin;
			--foxui-card-header---box-shadow: none;
		}

		&--rounded {
			--foxui-card-header---border-radius: 4px;
		}

		&--density-default {
			--foxui-card-header---density: 0px;
		}

		&--density-compact {
			--foxui-card-header---density: -8px;
		}

		&__underlay {
			position: var(--foxui-card-header__underlay---position);
		}

		&__prepend,
		&__append {
			&,
			> .foxui-badge {
				.foxui-icon {
					opacity: var(--foxui-card-header__icon---opacity);
				}
			}
		}

		&__prepend {
			align-items: var(--foxui-card-header__prepend---align-items);
			align-self: var(--foxui-card-header__prepend---align-self);
			display: var(--foxui-card-header__prepend---display);
			grid-area: var(--foxui-card-header__prepend---grid-area);
			min-width: var(--foxui-card-header__prepend---min-width);
			min-height: var(--foxui-card-header__prepend---min-height);
		}

		&__append {
			align-items: var(--foxui-card-header__append---align-items);
			align-self: var(--foxui-card-header__append---align-self);
			display: var(--foxui-card-header__append---display);
			grid-area: var(--foxui-card-header__append---grid-area);
			min-width: var(--foxui-card-header__append---min-width);
			min-height: var(--foxui-card-header__append---min-height);
		}

		&__content {
			align-self: var(--foxui-card-header__content---align-self);
			grid-area: var(--foxui-card-header__content---grid-area);
			overflow: var(--foxui-card-header__content---overflow);
		}

		&__title {
			hyphens: var(--foxui-card-header__title---hyphens);
			overflow-wrap: var(--foxui-card-header__title---overflow-wrap);
			overflow: var(--foxui-card-header__title---overflow);
			padding-block-start: var(--foxui-card-header__title---padding-block-start);
			padding-block-end: var(--foxui-card-header__title---padding-block-end);
			padding-inline-start: var(--foxui-card-header__title---padding-inline-start);
			padding-inline-end: var(--foxui-card-header__title---padding-inline-end);
			white-space: var(--foxui-card-header__title---white-space);
			text-overflow: var(--foxui-card-header__title---text-overflow);
			word-break: var(--foxui-card-header__title---word-break);
			word-wrap: var(--foxui-card-header__title---word-wrap);
			font-size: var(--foxui-card-header__title---font-size);
			font-weight: var(--foxui-card-header__title---font-weight);
			letter-spacing: var(--foxui-card-header__title---letter-spacing);
			line-height: var(--foxui-card-header__title---line-height);
			text-transform: var(--foxui-card-header__title---text-transform);
		}

		&__subtitle {
			-webkit-box-orient: vertical;
			display: var(--foxui-card-header__subtitle---display);
			opacity: var(--foxui-card-header__subtitle---opacity);
			overflow: var(--foxui-card-header__subtitle---overflow);
			padding-block-start: var(--foxui-card-header__subtitle---padding-block-start);
			padding-block-end: var(--foxui-card-header__subtitle---padding-block-end);
			padding-inline-start: var(--foxui-card-header__subtitle---padding-inline-start);
			padding-inline-end: var(--foxui-card-header__subtitle---padding-inline-end);
			text-overflow: var(--foxui-card-header__subtitle---text-overflow);
			word-break: var(--foxui-card-header__subtitle---word-break);
			font-size: var(--foxui-card-header__subtitle---font-size);
			font-weight: var(--foxui-card-header__subtitle---font-weight);
			letter-spacing: var(--foxui-card-header__subtitle---letter-spacing);
			line-height: var(--foxui-card-header__subtitle---line-height);
			text-transform: var(--foxui-card-header__subtitle---text-transform);
		}
	}
</style>

<style>
	:root {
		--foxui-card-header---align-items: center;
		--foxui-card-header---display: grid;
		--foxui-card-header---flex: none;
		--foxui-card-header---grid-template-areas: "prepend content append";
		--foxui-card-header---grid-template-columns: max-content 1fr auto;

		--foxui-card-header---max-width: 100%;
		--foxui-card-header---min-height: 40px;
		--foxui-card-header---box-sizing: border-box;

		--foxui-card-header---text-decoration: none;

		--foxui-card-header---border-top-width: 0;
		--foxui-card-header---border-left-width: 0;
		--foxui-card-header---border-bottom-width: 0;
		--foxui-card-header---border-right-width: 0;
		--foxui-card-header---border-width: var(--foxui-card-header---border-top-width) var(--foxui-card-header---border-left-width) var(--foxui-card-header---border-bottom-width) var(--foxui-card-header---border-right-width);
		--foxui-card-header---border-color: rgba(0, 0, 0, 0.87);
		--foxui-card-header---border-style: solid;
		--foxui-card-header---border-start-start-radius: 0;
		--foxui-card-header---border-start-end-radius: 0;
		--foxui-card-header---border-end-start-radius: 0;
		--foxui-card-header---border-end-end-radius: 0;
		--foxui-card-header---border-radius: var(--foxui-card-header---border-start-start-radius) var(--foxui-card-header---border-start-end-radius) var(--foxui-card-header---border-end-start-radius) var(--foxui-card-header---border-end-end-radius);

		--foxui-card-header---padding-block-start: 8px;
		--foxui-card-header---padding-block-end: 8px;
		--foxui-card-header---padding-inline-start: 16px;
		--foxui-card-header---padding-inline-end: 16px;

		--foxui-card-header---margin-block-start: 0;
		--foxui-card-header---margin-block-end: 0;
		--foxui-card-header---margin-inline-start: 0;
		--foxui-card-header---margin-inline-end: 0;

		--foxui-card-header---position: relative;
		--foxui-card-header---outline: none;

		--foxui-card-header__underlay---position: absolute;

		--foxui-card-header__icon---opacity: 0.87;

		--foxui-card-header__prepend---align-items: center;
		--foxui-card-header__prepend---align-self: center;
		--foxui-card-header__prepend---display: flex;
		--foxui-card-header__prepend---grid-area: prepend;
		--foxui-card-header__prepend---min-width: 24px;
		--foxui-card-header__prepend---min-height: 24px;

		--foxui-card-header__append---align-items: center;
		--foxui-card-header__append---align-self: center;
		--foxui-card-header__append---display: flex;
		--foxui-card-header__append---grid-area: append;
		--foxui-card-header__append---min-width: 24px;
		--foxui-card-header__append---min-height: 24px;

		--foxui-card-header__content---align-self: center;
		--foxui-card-header__content---grid-area: content;
		--foxui-card-header__content---overflow: hidden;

		--foxui-card-header__title---hyphens: auto;
		--foxui-card-header__title---overflow-wrap: normal;
		--foxui-card-header__title---overflow: hidden;

		--foxui-card-header__title---padding-block-start: 0;
		--foxui-card-header__title---padding-block-end: 0;
		--foxui-card-header__title---padding-inline-start: 0;
		--foxui-card-header__title---padding-inline-end: 0;

		--foxui-card-header__title---white-space: nowrap;
		--foxui-card-header__title---text-overflow: ellipsis;
		--foxui-card-header__title---word-break: normal;
		--foxui-card-header__title---word-wrap: break-word;
		--foxui-card-header__title---font-size: 1rem;
		--foxui-card-header__title---font-weight: 400;
		--foxui-card-header__title---letter-spacing: 0.009375em;
		--foxui-card-header__title---line-height: 1.5rem;
		--foxui-card-header__title---text-transform: none;

		--foxui-card-header__subtitle---display: -webkit-box;
		--foxui-card-header__subtitle---opacity: 0.6;
		--foxui-card-header__subtitle---overflow: hidden;

		--foxui-card-header__subtitle---padding-block-start: 0;
		--foxui-card-header__subtitle---padding-block-end: 0;
		--foxui-card-header__subtitle---padding-inline-start: 0;
		--foxui-card-header__subtitle---padding-inline-end: 0;

		--foxui-card-header__subtitle---text-overflow: ellipsis;
		--foxui-card-header__subtitle---word-break: break-all;
		--foxui-card-header__subtitle---font-size: 0.875rem;
		--foxui-card-header__subtitle---font-weight: 400;
		--foxui-card-header__subtitle---letter-spacing: 0.0178571429em;
		--foxui-card-header__subtitle---line-height: 1rem;
		--foxui-card-header__subtitle---text-transform: none;
	}
</style>
