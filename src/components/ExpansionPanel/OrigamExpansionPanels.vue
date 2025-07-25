<template>
	<component
			:is="tag"
			:class="expansionPanelsClasses"
			:style="expansionPanelsStyles"
	>
		<slot name="default">
			<template
					v-for="(item, index) in items"
					:key="index"
			>
				<slot
						:name="`item.${index}`"
						v-bind="{collapseIcon, expandIcon, hideActions, item, index}"
				>
					<slot
							name="item"
							v-bind="{collapseIcon, expandIcon, hideActions, item, index}"
					>
						<origam-expansion-panel v-bind="{collapseIcon, expandIcon, hideActions, ...item}">
							<template
									v-if="slots[`header.${index}`] || slots.header"
									#header="headerSlotProps"
							>
								<slot
										:name="`header.${index}`"
										v-bind="headerSlotProps"
								>
									<slot
											name="header"
											v-bind="headerSlotProps"
									/>
								</slot>
							</template>

							<template
									v-if="slots[`prepend.${index}`] || slots.prepend"
									#prepend="prependSlotProps"
							>
								<slot
										:name="`prepend.${index}`"
										v-bind="prependSlotProps"
								>
									<slot
											name="prepend"
											v-bind="prependSlotProps"
									/>
								</slot>
							</template>

							<template
									v-if="slots[`title.${index}`] || slots.title"
									#title="titleSlotProps"
							>
								<slot
										:name="`title.${index}`"
										v-bind="titleSlotProps"
								>
									<slot
											name="title"
											v-bind="titleSlotProps"
									/>
								</slot>
							</template>

							<template
									v-if="slots[`append.${index}`] || slots.append"
									#append="appendSlotProps"
							>
								<slot
										:name="`append.${index}`"
										v-bind="appendSlotProps"
								>
									<slot
											name="append"
											v-bind="appendSlotProps"
									/>
								</slot>
							</template>

							<template
									v-if="slots[`wrapper.${index}`] || slots.wrapper"
									#wrapper="wrapperSlotProps"
							>
								<slot
										:name="`wrapper.${index}`"
										v-bind="wrapperSlotProps"
								>
									<slot
											name="wrapper"
											v-bind="wrapperSlotProps"
									/>
								</slot>
							</template>

							<template
									v-if="slots[`content.${index}`] || slots.content"
									#default
							>
								<slot :name="`content.${index}`">
									<slot name="content"/>
								</slot>
							</template>
						</origam-expansion-panel>
					</slot>
				</slot>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useSlots } from 'vue'
	import { OrigamExpansionPanel } from '../../components'

	import {
		useBorder,
		useBothColor,
		useDensity,
		useElevation,
		useGroup,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { ORIGAM_EXPANSION_PANEL_KEY } from '../../consts'

	import type { IExpansionPanelsProps } from '../../interfaces'

	const props = withDefaults(defineProps<IExpansionPanelsProps>(), {
		tag: 'div'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IExpansionPanelsProps>(props)

	useGroup(props, ORIGAM_EXPANSION_PANEL_KEY)

	const slots = useSlots()

	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props, toRef(props, 'flat'))
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)

	// CLASSES & STYLES

	const expansionPanelsStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelsClasses = computed(() => {
		return [
			'origam-expansion-panels',
			{
				'origam-expansion-panels--flat': props.flat,
				'origam-expansion-panels--accordion': props.accordion,
				'origam-expansion-panels--popout': props.popout,
				'origam-expansion-panels--inset': props.inset
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			roundedClasses.value,
			elevationClasses.value,
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
	// TODO - Rework with css variables
	.origam-expansion-panels {
		$this: &;

		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		padding: 0;
		width: 100%;
		position: relative;
		z-index: 1;

		&:not(.origam-expansion-panels--accordion) {
			> * {
				&:not(:first-child) {
					&:not(:last-child) {
						&:not(.origam-expansion-panel--active) {
							&:not(.origam-expansion-panel--before-active) {
								border-bottom-left-radius: 0;
								border-bottom-right-radius: 0;
							}

							&:not(.origam-expansion-panel--after-active) {
								border-top-left-radius: 0;
								border-top-right-radius: 0;
							}
						}
					}
				}

				&:first-child {
					&:not(:last-child) {
						&:not(.origam-expansion-panel--active) {
							&:not(.origam-expansion-panel--before-active) {
								border-bottom-left-radius: 0;
								border-bottom-right-radius: 0;
							}
						}
					}
				}

				&:last-child {
					&:not(:first-child) {
						&:not(.origam-expansion-panel--active) {
							&:not(.origam-expansion-panel--after-active) {
								border-top-left-radius: 0;
								border-top-right-radius: 0;
							}
						}
					}
				}
			}
		}

		&#{$this}--accordion {
			> * {
				&:first-child {
					&:not(:last-child) {
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
					}
				}

				&:last-child {
					&:not(:first-child) {
						border-top-left-radius: 0;
						border-top-right-radius: 0;

						:deep(.origam-expansion-panel-header--active) {
							border-bottom-left-radius: initial;
							border-bottom-right-radius: initial;
						}
					}
				}

				&:not(:first-child) {
					&:not(:last-child) {
						border-radius: 0;
					}
				}
			}

			:deep(.origam-expansion-panel-header__overlay) {
				transition: 0.3s border-radius cubic-bezier(0.4, 0, 0.2, 1);
			}

			> .origam-expansion-panel {
				margin-top: 0;

				&:after {
					opacity: 1;
				}
			}
		}

		&#{$this}--popout {
			> .origam-expansion-panel {
				max-width: calc(100% - 32px);

				&--active {
					max-width: calc(100% + 16px);
				}
			}
		}

		&#{$this}--inset {
			> .origam-expansion-panel {
				max-width: 100%;

				&--active {
					max-width: calc(100% - 32px);
				}
			}
		}

		&#{$this}--flat {
			> .origam-expansion-panel {
				&:after {
					border-top: none;
				}

				:deep(.origam-expansion-panel__shadow) {
					display: none;
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
