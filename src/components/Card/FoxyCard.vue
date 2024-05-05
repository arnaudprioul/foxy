<template>
  <component
      :is="link.tag"
      v-ripple="isClickable && props.ripple"
      :class="cardClasses"
      :href="link.href"
      :style="cardStyles"
      :tabindex="props.disabled ? -1 : undefined"
      @click="isClickable && link.navigate">
    <span v-if="isClickable" key="overlay" class="foxy-card__overlay"/>
    <span key="underlay" class="foxy-card__underlay"/>

    <slot name="wrapper">
      <template v-if="hasLoading">
        <slot name="loader">
          <div class="foxy-card__loader">
            <foxy-progress
                :type="PROGRESS_TYPE.LINEAR"
                :active="!!props.loading"
                :color="props.color"
                :indeterminate="typeof props.loading !== 'number'"
                :model-value="typeof props.loading === 'number' ? props.loading : undefined"
                class="foxy-card__progress foxy-card__progress--linear"
                thickness="4"
            />
          </div>
        </slot>
      </template>

      <template v-if="hasHeader">
        <slot name="header">
          <foxy-card-header
              key="item"
              :append-avatar="props.appendAvatar"
              :append-icon="props.appendIcon"
              :prepend-avatar="props.prependAvatar"
              :prepend-icon="props.prependIcon"
              :subtitle="props.subtitle"
              :title="props.title"
              :density="props.density"
              class="foxy-card__header"
              @click:prepend="handleClickPrepend"
              @click:append="handleClickAppend">
            <template v-if="hasSlot('header:append')" #append>
              <slot name="header:append"/>
            </template>

            <template v-if="hasSlot('header:prepend')" #prepend>
              <slot name="header:prepend"/>
            </template>

            <template v-if="hasSlot('header:title')" #title>
              <slot name="header:title"/>
            </template>

            <template v-if="hasSlot('header:subtitle')" #subtitle>
              <slot name="header:subtitle"/>
            </template>

            <template v-if="hasSlot('header:content')" #default>
              <slot name="header:content"/>
            </template>
          </foxy-card-header>
        </slot>
      </template>

      <template v-if="hasAsset">
        <div key="image" class="foxy-card__asset">
          <slot name="asset">
            <foxy-img
                key="image-img"
                :src="props.image"
                class="foxy-card__image"
                cover
            />
          </slot>
        </div>
      </template>

      <div class="foxy-card__content">
        <template v-if="hasText">
          <slot name="text">
            <foxy-card-text key="text" :text="props.text" class="foxy-card__text"/>
          </slot>
        </template>

        <slot name="default"/>
      </div>

      <template v-if="hasFooter">
        <div class="foxy-card__footer">
          <slot name="footer"/>
        </div>
      </template>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyCardHeader, FoxyCardText, FoxyImg, FoxyProgress } from '@foxy/components'

  import {
    useAdjacent,
    useBorder,
    useDensity,
    useDimension,
    useElevation,
    useLink,
    useLoader,
    useLocation,
    useMargin,
    usePadding,
    usePosition,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { vRipple } from '@foxy/directives'

  import { DENSITY, PROGRESS_TYPE } from '@foxy/enums'

  import { ICardProps } from '@foxy/interfaces'

  import { computed, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ICardProps>(), { ripple: true, density: DENSITY.DEFAULT, tag: 'div' })

  const attrs = useAttrs()

  const { borderClasses, borderStyles } = useBorder(props)
  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { loaderClasses } = useLoader(props)
  const { locationStyles } = useLocation(props)
  const { positionClasses } = usePosition(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { paddingStyles, paddingClasses } = usePadding(props)

  const {handleClickPrepend, handleClickAppend, hasAppend, hasPrepend} = useAdjacent(props)
  const link = useLink(props, attrs)

  const isClickable = computed(() => {
    return !props.disabled && props.link && (props.link || link.isClickable.value)
  })

  const { hasSlot } = useSlots()


  // SLOTS

  const hasTitle = computed(() => {
    return hasSlot('header:title') || props.title != null
  })
  const hasSubtitle = computed(() => {
    return hasSlot('header:subtitle') || props.subtitle != null
  })
  const hasAsset = computed(() => {
    return !!(hasSlot('asset') || props.image)
  })
  const hasFooter = computed(() => {
    return hasSlot('footer')
  })
  const hasHeader = computed(() => {
    return hasSlot('header') || hasTitle.value || hasSubtitle.value || hasPrepend.value || hasAppend.value
  })
  const hasText = computed(() => {
    return hasSlot('text') || props.text != null
  })
  const hasLoading = computed(() => {
    return hasSlot('loader') || !!props.loading
  })

  // CLASS & STYLES

  const cardStyles = computed(() => {
    return [
      borderStyles.value,
      dimensionStyles.value,
      locationStyles.value,
      roundedStyles.value,
      marginStyles.value,
      paddingStyles.value,
      props.style
    ] as StyleValue
  })
  const cardClasses = computed(() => {
    return [
      'foxy-card',
      {
        'foxy-card--disabled': props.disabled,
        'foxy-card--flat': props.flat,
        'foxy-card--hover': props.hover && !(props.disabled || props.flat),
        'foxy-card--link': isClickable.value,
      },
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      loaderClasses.value,
      positionClasses.value,
      roundedClasses.value,
      marginClasses.value,
      paddingClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-card {
    $this: &;

    display: var(--foxy-card---display);
    overflow: var(--foxy-card---overflow);
    overflow-wrap: var(--foxy-card---overflow-wrap);
    position: var(--foxy-card---position);
    z-index: var(--foxy-card---z-index);

    text-decoration: var(--foxy-card---text-decoration);
    transition-duration: var(--foxy-card---transition-duration);
    transition-property: var(--foxy-card---transition-property);
    transition-timing-function: var(--foxy-card---transition-timing-function);

    pointer-events: var(--foxy-card---pointer-events);
    user-select: var(--foxy-card---user-select);
    cursor: var(--foxy-card---cursor);

    background: var(--foxy-card---background);
    box-shadow: var(--foxy-card---box-shadow);
    color: var(--foxy-card---color);

    padding-block-start: calc(var(--foxy-card---padding-block-start) + var(--foxy-card---density));
    padding-block-end: calc(var(--foxy-card---padding-block-end) + var(--foxy-card---density));
    padding-inline-start: calc(var(--foxy-card---padding-inline-start) + var(--foxy-card---density));
    padding-inline-end: calc(var(--foxy-card---padding-inline-end) + var(--foxy-card---density));

    margin-block-start: var(--foxy-card---margin-block-start);
    margin-block-end: var(--foxy-card---margin-block-end);
    margin-inline-start: var(--foxy-card---margin-inline-start);
    margin-inline-end: var(--foxy-card---margin-inline-end);

    border-color: var(--foxy-card---border-color);
    border-style: var(--foxy-card---border-style);
    border-width: var(--foxy-card---border-width);
    border-radius: var(--foxy-card---border-radius);

    &__overlay {
      background-color: var(--foxy-card__overlay---background-color);
      border-radius: var(--foxy-card__overlay---border-radius);
      opacity: var(--foxy-card__overlay---opacity);
      pointer-events: var(--foxy-card__overlay---pointer-events);
      position: var(--foxy-card__overlay---position);
      bottom: var(--foxy-card__overlay---position-bottom);
      left: var(--foxy-card__overlay---position-left);
      right: var(--foxy-card__overlay---position-right);
      top: var(--foxy-card__overlay---position-top);
      transition-property: var(--foxy-card__overlay---transition-property);
      transition-duration: var(--foxy-card__overlay---transition-duration);
      transition-timing-function: var(--foxy-card__overlay---transition-timing-function);
    }

    &__underlay {
      position: var(--foxy-card__underlay---position);
    }

    > * {
      opacity: var(--foxy-card---opacity);
    }

    &--bordered {
      --foxy-card---border-width: thin;
      --foxy-card---box-shadow: none;
    }

    &--rounded {
      --foxy-card---border-radius: 4px;
    }

    &--absolute {
      --foxy-card---position: absolute;
    }

    &--fixed {
      --foxy-card---position: fixed;
    }

    &--density-default {
      --foxy-card---density: 0px;
    }

    &--density-compact {
      --foxy-card---density: -8px;
    }

    &:hover,
    &:focus-visible,
    &:focus {
      > #{$this}__overlay {
        --foxy-card__overlay---opacity: 0.5;
      }
    }

    &--active,
    [aria-haspopup=menu][aria-expanded=true]{
      > #{$this}__overlay {
        --foxy-card__overlay---opacity: 0.5;
      }

      &:hover,
      &:focus-visible,
      &:focus {
        > #{$this}__overlay {
          --foxy-card__overlay---opacity: 0.7;
        }
      }
    }

    &--disabled {
      --foxy-card---pointer-events: none;
      --foxy-card---user-select: none;

      > * {
        --foxy-card---opacity: 0.6;
      }
    }

    &--flated {
      --foxy-card---box-shadow: none;
    }

    &--link {
      --foxy-card---cursor: pointer;
    }

    &--hover {
      --foxy-card---cursor: pointer;

      &:before {
        border-radius: var(--foxy-card__before---border-radius);
        bottom: var(--foxy-card__before---bottom);
        content: var(--foxy-card__before---content);
        display: var(--foxy-card__before---display);
        left: var(--foxy-card__before---left);
        pointer-events: var(--foxy-card__before---pointer-events);
        position: var(--foxy-card__before---position);
        right: var(--foxy-card__before---right);
        top: var(--foxy-card__before---top);
        transition: var(--foxy-card__before---transition);
        opacity: var(--foxy-card__before---opacity);
        z-index: var(--foxy-card__before---z-index);
        box-shadow: var(--foxy-card__before---box-shadow);
      }

      &:after {
        border-radius: var(--foxy-card__after---border-radius);
        bottom: var(--foxy-card__after---bottom);
        content: var(--foxy-card__after---content);
        display: var(--foxy-card__after---display);
        left: var(--foxy-card__after---left);
        pointer-events: var(--foxy-card__after---pointer-events);
        position: var(--foxy-card__after---position);
        right: var(--foxy-card__after---right);
        top: var(--foxy-card__after---top);
        transition: var(--foxy-card__after---transition);
        z-index: var(--foxy-card__after---z-index);
        opacity: var(--foxy-card__after---opacity);
        box-shadow: var(--foxy-card__after---box-shadow);
      }

      &:hover {
        --foxy-card---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

        &:after {
          --foxy-card__after---opacity: 1;
        }

        &:before {
          --foxy-card__after---opacity: 0;
        }
      }
    }
  }
</style>

<style>
  :root {
    --foxy-card---overflow: hidden;
    --foxy-card---overflow-wrap: break-word;
    --foxy-card---position: relative;
    --foxy-card---z-index: 0;

    --foxy-card---transition-duration: 0.28s;
    --foxy-card---transition-property: box-shadow, opacity, background;
    --foxy-card---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    --foxy-card---color: rgba(0, 0, 0, 0.87);
    --foxy-card---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
    --foxy-card---background: rgb(255, 255, 255);

    --foxy-card---display: block;

    --foxy-card---pointer-events: auto;
    --foxy-card---user-select: auto;
    --foxy-card---cursor: auto;

    --foxy-card---text-decoration: none;

    --foxy-card---border-top-width: 0;
    --foxy-card---border-left-width: 0;
    --foxy-card---border-bottom-width: 0;
    --foxy-card---border-right-width: 0;
    --foxy-card---border-width: var(--foxy-card---border-top-width) var(--foxy-card---border-left-width) var(--foxy-card---border-bottom-width) var(--foxy-card---border-right-width);
    --foxy-card---border-color: rgba(0, 0, 0, 0.87);
    --foxy-card---border-style: solid;
    --foxy-card---border-start-start-radius: 0;
    --foxy-card---border-start-end-radius: 0;
    --foxy-card---border-end-start-radius: 0;
    --foxy-card---border-end-end-radius: 0;
    --foxy-card---border-radius: var(--foxy-card---border-start-start-radius) var(--foxy-card---border-start-end-radius) var(--foxy-card---border-end-start-radius) var(--foxy-card---border-end-end-radius);

    --foxy-card---padding-block-start: 0;
    --foxy-card---padding-block-end: 0;
    --foxy-card---padding-inline-start: 0;
    --foxy-card---padding-inline-end: 0;

    --foxy-card---margin-block-start: 0;
    --foxy-card---margin-block-end: 0;
    --foxy-card---margin-inline-start: 0;
    --foxy-card---margin-inline-end: 0;

    --foxy-card---opacity: 1;

    --foxy-card__overlay---background-color: #000;
    --foxy-card__overlay---border-radius: inherit;
    --foxy-card__overlay---opacity: 0;
    --foxy-card__overlay---pointer-events: none;
    --foxy-card__overlay---position: absolute;
    --foxy-card__overlay---position-bottom: 0;
    --foxy-card__overlay---position-left: 0;
    --foxy-card__overlay---position-right: 0;
    --foxy-card__overlay---position-top: 0;
    --foxy-card__overlay---transition-property: opacity;
    --foxy-card__overlay---transition-duration: 0.2s;
    --foxy-card__overlay---transition-timing-function: ease-in-out;

    --foxy-card__underlay---position: absolute;

    --foxy-card__before---border-radius: inherit;
    --foxy-card__before---bottom: 0;
    --foxy-card__before---content: "";
    --foxy-card__before---display: block;
    --foxy-card__before---left: 0;
    --foxy-card__before---pointer-events: none;
    --foxy-card__before---position: absolute;
    --foxy-card__before---right: 0;
    --foxy-card__before---top: 0;
    --foxy-card__before---transition: inherit;
    --foxy-card__before---opacity: 1;
    --foxy-card__before---z-index: -1;
    --foxy-card__before---box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

    --foxy-card__after---border-radius: inherit;
    --foxy-card__after---bottom: 0;
    --foxy-card__after---content: "";
    --foxy-card__after---display: block;
    --foxy-card__after---left: 0;
    --foxy-card__after---pointer-events: none;
    --foxy-card__after---position: absolute;
    --foxy-card__after---right: 0;
    --foxy-card__after---top: 0;
    --foxy-card__after---transition: inherit;
    --foxy-card__after---z-index: 1;
    --foxy-card__after---opacity: 0;
    --foxy-card__after---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
</style>
