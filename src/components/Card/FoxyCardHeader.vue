<template>
	<component
			:is="tag"
			:class="cardHeaderClasses"
			:style="cardHeaderStyles"
			v-bind="$attrs"
	>
    <span
		    key="underlay"
		    class="foxy-card-header__underlay"
    />

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="foxy-card-header__prepend"
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

			<div
					class="foxy-card-header__content"
					data-no-activator=""
			>
				<div
						v-if="hasTitle"
						key="title"
						class="foxy-card-header__title"
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
						class="foxy-card-header__subtitle"
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
					class="foxy-card-header__append"
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
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyIcon } from '@foxy/components'

	import { useAdjacent, useDensity, useProps } from '@foxy/composables'

	import type { ICardHeaderProps } from '@foxy/interfaces'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICardHeaderProps>(), {tag: 'FoxyToolbar'})

	defineEmits(['click:prepend', 'click:append'])

	const {filterProps} = useProps<ICardHeaderProps>(props)

	const slots = useSlots()
	const {densityClasses} = useDensity(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasPrepend,
		hasAppend
	} = useAdjacent(props)

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
			'foxy-card-header',
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
	.foxy-card-header {
		$this: &;

		align-items: var(--foxy-card-header---align-items);
		display: var(--foxy-card-header---display);
		flex: var(--foxy-card-header---flex);
		grid-template-areas: var(--foxy-card-header---grid-template-areas);
		grid-template-columns: var(--foxy-card-header---grid-template-columns);

		max-width: var(--foxy-card-header---max-width);
		min-height: calc(var(--foxy-card-header---min-height) + var(--foxy-card-header---density));
		box-sizing: var(--foxy-card-header---box-sizing);

		text-decoration: var(--foxy-card-header---text-decoration);

		outline: var(--foxy-card-header---outline);
		position: var(--foxy-card-header---position);

		padding-block-start: calc(var(--foxy-card-header---padding-block-start) + var(--foxy-card-header---density));
		padding-block-end: calc(var(--foxy-card-header---padding-block-end) + var(--foxy-card-header---density));
		padding-inline-start: calc(var(--foxy-card-header---padding-inline-start) + var(--foxy-card-header---density));
		padding-inline-end: calc(var(--foxy-card-header---padding-inline-end) + var(--foxy-card-header---density));

		margin-block-start: var(--foxy-card-header---margin-block-start);
		margin-block-end: var(--foxy-card-header---margin-block-end);
		margin-inline-start: var(--foxy-card-header---margin-inline-start);
		margin-inline-end: var(--foxy-card-header---margin-inline-end);

		border-color: var(--foxy-card-header---border-color);
		border-style: var(--foxy-card-header---border-style);
		border-width: var(--foxy-card-header---border-width);
		border-radius: var(--foxy-card-header---border-radius);

		&--border {
			--foxy-card-header---border-width: thin;
			--foxy-card-header---box-shadow: none;
		}

		&--rounded {
			--foxy-card-header---border-radius: 4px;
		}

		&--density-default {
			--foxy-card-header---density: 0px;
		}

		&--density-compact {
			--foxy-card-header---density: -8px;
		}

		&__underlay {
			position: var(--foxy-card-header__underlay---position);
		}

		&__prepend,
		&__append {
			&,
			> .foxy-badge {
				.foxy-icon {
					opacity: var(--foxy-card-header__icon---opacity);
				}
			}
		}

		&__prepend {
			align-items: var(--foxy-card-header__prepend---align-items);
			align-self: var(--foxy-card-header__prepend---align-self);
			display: var(--foxy-card-header__prepend---display);
			grid-area: var(--foxy-card-header__prepend---grid-area);
			min-width: var(--foxy-card-header__prepend---min-width);
			min-height: var(--foxy-card-header__prepend---min-height);
		}

		&__append {
			align-items: var(--foxy-card-header__append---align-items);
			align-self: var(--foxy-card-header__append---align-self);
			display: var(--foxy-card-header__append---display);
			grid-area: var(--foxy-card-header__append---grid-area);
			min-width: var(--foxy-card-header__append---min-width);
			min-height: var(--foxy-card-header__append---min-height);
		}

		&__content {
			align-self: var(--foxy-card-header__content---align-self);
			grid-area: var(--foxy-card-header__content---grid-area);
			overflow: var(--foxy-card-header__content---overflow);
		}

		&__title {
			hyphens: var(--foxy-card-header__title---hyphens);
			overflow-wrap: var(--foxy-card-header__title---overflow-wrap);
			overflow: var(--foxy-card-header__title---overflow);
			padding-block-start: var(--foxy-card-header__title---padding-block-start);
			padding-block-end: var(--foxy-card-header__title---padding-block-end);
			padding-inline-start: var(--foxy-card-header__title---padding-inline-start);
			padding-inline-end: var(--foxy-card-header__title---padding-inline-end);
			white-space: var(--foxy-card-header__title---white-space);
			text-overflow: var(--foxy-card-header__title---text-overflow);
			word-break: var(--foxy-card-header__title---word-break);
			word-wrap: var(--foxy-card-header__title---word-wrap);
			font-size: var(--foxy-card-header__title---font-size);
			font-weight: var(--foxy-card-header__title---font-weight);
			letter-spacing: var(--foxy-card-header__title---letter-spacing);
			line-height: var(--foxy-card-header__title---line-height);
			text-transform: var(--foxy-card-header__title---text-transform);
		}

		&__subtitle {
			-webkit-box-orient: vertical;
			display: var(--foxy-card-header__subtitle---display);
			opacity: var(--foxy-card-header__subtitle---opacity);
			overflow: var(--foxy-card-header__subtitle---overflow);
			padding-block-start: var(--foxy-card-header__subtitle---padding-block-start);
			padding-block-end: var(--foxy-card-header__subtitle---padding-block-end);
			padding-inline-start: var(--foxy-card-header__subtitle---padding-inline-start);
			padding-inline-end: var(--foxy-card-header__subtitle---padding-inline-end);
			text-overflow: var(--foxy-card-header__subtitle---text-overflow);
			word-break: var(--foxy-card-header__subtitle---word-break);
			font-size: var(--foxy-card-header__subtitle---font-size);
			font-weight: var(--foxy-card-header__subtitle---font-weight);
			letter-spacing: var(--foxy-card-header__subtitle---letter-spacing);
			line-height: var(--foxy-card-header__subtitle---line-height);
			text-transform: var(--foxy-card-header__subtitle---text-transform);
		}
	}
</style>

<style>
	:root {
		--foxy-card-header---align-items: center;
		--foxy-card-header---display: grid;
		--foxy-card-header---flex: none;
		--foxy-card-header---grid-template-areas: "prepend content append";
		--foxy-card-header---grid-template-columns: max-content 1fr auto;

		--foxy-card-header---max-width: 100%;
		--foxy-card-header---min-height: 40px;
		--foxy-card-header---box-sizing: border-box;

		--foxy-card-header---text-decoration: none;

		--foxy-card-header---border-top-width: 0;
		--foxy-card-header---border-left-width: 0;
		--foxy-card-header---border-bottom-width: 0;
		--foxy-card-header---border-right-width: 0;
		--foxy-card-header---border-width: var(--foxy-card-header---border-top-width) var(--foxy-card-header---border-left-width) var(--foxy-card-header---border-bottom-width) var(--foxy-card-header---border-right-width);
		--foxy-card-header---border-color: rgba(0, 0, 0, 0.87);
		--foxy-card-header---border-style: solid;
		--foxy-card-header---border-start-start-radius: 0;
		--foxy-card-header---border-start-end-radius: 0;
		--foxy-card-header---border-end-start-radius: 0;
		--foxy-card-header---border-end-end-radius: 0;
		--foxy-card-header---border-radius: var(--foxy-card-header---border-start-start-radius) var(--foxy-card-header---border-start-end-radius) var(--foxy-card-header---border-end-start-radius) var(--foxy-card-header---border-end-end-radius);

		--foxy-card-header---padding-block-start: 8px;
		--foxy-card-header---padding-block-end: 8px;
		--foxy-card-header---padding-inline-start: 16px;
		--foxy-card-header---padding-inline-end: 16px;

		--foxy-card-header---margin-block-start: 0;
		--foxy-card-header---margin-block-end: 0;
		--foxy-card-header---margin-inline-start: 0;
		--foxy-card-header---margin-inline-end: 0;

		--foxy-card-header---position: relative;
		--foxy-card-header---outline: none;

		--foxy-card-header__underlay---position: absolute;

		--foxy-card-header__icon---opacity: 0.87;

		--foxy-card-header__prepend---align-items: center;
		--foxy-card-header__prepend---align-self: center;
		--foxy-card-header__prepend---display: flex;
		--foxy-card-header__prepend---grid-area: prepend;
		--foxy-card-header__prepend---min-width: 24px;
		--foxy-card-header__prepend---min-height: 24px;

		--foxy-card-header__append---align-items: center;
		--foxy-card-header__append---align-self: center;
		--foxy-card-header__append---display: flex;
		--foxy-card-header__append---grid-area: append;
		--foxy-card-header__append---min-width: 24px;
		--foxy-card-header__append---min-height: 24px;

		--foxy-card-header__content---align-self: center;
		--foxy-card-header__content---grid-area: content;
		--foxy-card-header__content---overflow: hidden;

		--foxy-card-header__title---hyphens: auto;
		--foxy-card-header__title---overflow-wrap: normal;
		--foxy-card-header__title---overflow: hidden;

		--foxy-card-header__title---padding-block-start: 0;
		--foxy-card-header__title---padding-block-end: 0;
		--foxy-card-header__title---padding-inline-start: 0;
		--foxy-card-header__title---padding-inline-end: 0;

		--foxy-card-header__title---white-space: nowrap;
		--foxy-card-header__title---text-overflow: ellipsis;
		--foxy-card-header__title---word-break: normal;
		--foxy-card-header__title---word-wrap: break-word;
		--foxy-card-header__title---font-size: 1rem;
		--foxy-card-header__title---font-weight: 400;
		--foxy-card-header__title---letter-spacing: 0.009375em;
		--foxy-card-header__title---line-height: 1.5rem;
		--foxy-card-header__title---text-transform: none;

		--foxy-card-header__subtitle---display: -webkit-box;
		--foxy-card-header__subtitle---opacity: 0.6;
		--foxy-card-header__subtitle---overflow: hidden;

		--foxy-card-header__subtitle---padding-block-start: 0;
		--foxy-card-header__subtitle---padding-block-end: 0;
		--foxy-card-header__subtitle---padding-inline-start: 0;
		--foxy-card-header__subtitle---padding-inline-end: 0;

		--foxy-card-header__subtitle---text-overflow: ellipsis;
		--foxy-card-header__subtitle---word-break: break-all;
		--foxy-card-header__subtitle---font-size: 0.875rem;
		--foxy-card-header__subtitle---font-weight: 400;
		--foxy-card-header__subtitle---letter-spacing: 0.0178571429em;
		--foxy-card-header__subtitle---line-height: 1rem;
		--foxy-card-header__subtitle---text-transform: none;
	}
</style>
