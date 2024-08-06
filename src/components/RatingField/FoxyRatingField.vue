<template>
  <foxy-input
    :id="id"
    v-model="model"
    :class="ratingFieldClasses"
    :style="ratingFieldStyles"
    v-bind="{...rootAttrs, ...inputProps}">
    <template v-if="hasSlot('prepend')" #prepend>
      <slot name="prepend"/>
    </template>

    <template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
      <slot name="default" v-bind="{id,messagesId,isDisabled,isReadonly,isValid}">
        <div class="foxy-rating-field__label">
          <slot name="label">
            <foxy-label :for="id" :required="required" :text="label"/>
          </slot>
        </div>

        <div class="foxy-rating-field__empty">
          <foxy-rating-field-item
            :index="-1"
            :show-star="false"
            :value="0"
            v-bind="{...itemState[0], ...eventState[0]}"/>
        </div>

        <template
          v-for="(range, index) in ranges"
          :key="index">
          <div class="foxy-rating-field__wrapper">
            <template v-if="hasLabels && labelOnTop && hasSlot(`itemLabel.${index}`)">
              <slot :name="`itemLabel.${index}`">
                <slot name="itemLabel">
                  <span>{{ itemLabels[index] ?? '&nbsp;' }}</span>
                </slot>
              </slot>
            </template>
            <div class="foxy-rating-field__content">
              <template v-if="halfIncrements">
                <foxy-rating-field-item
                  :checked="isChecked(range - 0.5)"
                  :index="index * 2"
                  :value="range - 0.5"
                  v-bind="{...itemState[index * 2], ...eventState[(index * 2) + 1]}"/>
                <foxy-rating-field-item
                  :checked="isChecked(range)"
                  :index="(index * 2) + 1"
                  :value="range"
                  v-bind="{...itemState[(index * 2) + 1], ...eventState[(index * 2) + 2]}"/>
              </template>
              <template v-else>
                <foxy-rating-field-item
                  :checked="isChecked(range)"
                  :index="index"
                  :value="range"
                  v-bind="{...itemState[index], ...eventState[index + 1]}"/>
              </template>
            </div>
            <template v-if="hasLabels && labelOnBottom && hasSlot(`itemLabel.${index}`)">
              <slot :name="`itemLabel.${index}`">
                <slot name="itemLabel">
                  <span>{{ itemLabels[index] ?? '&nbsp;' }}</span>
                </slot>
              </slot>
            </template>
          </div>
        </template>
      </slot>
    </template>

    <template v-if="hasSlot('append')" #append>
      <slot name="append"/>
    </template>

    <template v-if="hasSlot('details')" #details="detailsSlotProps">
      <slot name="details" v-bind="detailsSlotProps"/>
    </template>

    <template v-if="hasSlot('messages')" #messages="{hasMessages, messages}">
      <slot name="messages" v-bind="{hasMessages, messages}"/>
    </template>

    <template v-if="hasSlot('message')" #message="{message}">
      <slot name="message" v-bind="{message}"/>
    </template>
  </foxy-input>
</template>

<script lang="ts" setup>
  import { FoxyInput, FoxyLabel, FoxyRatingFieldItem } from '@foxy/components'

  import { useSlots, useVModel } from '@foxy/composables'

  import { INPUT_PROPS, RATING_FIELD_ITEM_PROPS } from '@foxy/consts'

  import { BLOCK, DENSITY, SIZES } from '@foxy/enums'

  import { IRatingFieldProps } from '@foxy/interfaces'

  import { clamp, createRange, filterInputAttrs, getUid, keys, omit, pick } from '@foxy/utils'

  import { computed, shallowRef, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<IRatingFieldProps>(), {
    emptyIcon: '$ratingEmpty',
    fullIcon: '$ratingFull',
    length: 5,
    modelValue: 0,
    itemLabelPosition: BLOCK.TOP,
    tag: 'div',
    density: DENSITY.DEFAULT,
    size: SIZES.DEFAULT
  })

  const emits = defineEmits(['update:modelValue'])

  const { hasSlot } = useSlots()

  const model = useVModel(props, 'modelValue')
  const attrs = useAttrs()

  const normalizedValue = computed(() => {
    return clamp(parseFloat(model.value), 0, +props.length)
  })
  const ranges = computed(() => {
    return createRange(Number(props.length), 1)
  })
  const increments = computed(() => {
    return ranges.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v])
  })
  const name = computed(() => {
    return props.name ?? `foxy-rating-${getUid()}`
  })

  const hoverIndex = shallowRef(-1)

  const itemState = computed(() => {
    return increments.value.map((value) => {
      const isFilled = normalizedValue.value >= value
      const isHovered = hoverIndex.value >= value
      const isHovering = props.hover && hoverIndex.value > -1
      const ratingFieldItemProps = omit(pick(props, keys(RATING_FIELD_ITEM_PROPS)), ['name'])

      return { isFilled, isHovered, isHovering, name: name.value, ...ratingFieldItemProps }
    })
  })
  const eventState = computed(() => {
    return [0, ...increments.value].map((value) => {
      const onMouseenter = () => {
        hoverIndex.value = value
      }

      const onMouseleave = () => {
        hoverIndex.value = -1
      }

      const onClick = () => {
        if (props.disabled || props.readonly) return
        model.value = normalizedValue.value === value && props.clearable ? 0 : value
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onClick,
      }
    })
  })
  const isChecked = (value) => {
    return normalizedValue.value === value
  }

  const hasLabels = computed(() => {
    return !!props.itemLabels?.length || hasSlot('itemLabel')
  })
  const labelOnTop = computed(() => {
    return props.itemLabelPosition === BLOCK.TOP
  })
  const labelOnBottom = computed(() => {
    return props.itemLabelPosition === BLOCK.BOTTOM
  })

  const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

  const inputProps = computed(() => {
    return omit(pick(props, keys(INPUT_PROPS)), ['modelValue', 'id', 'focused'])
  })

  // CLASS & STYLES

  const ratingFieldStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const ratingFieldClasses = computed(() => {
    return [
      'foxy-rating-field',
      {
        'foxy-rating-field--hover': props.hover,
        'foxy-rating-field--readonly': props.readonly,
      },
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-rating-field {
    max-width: 100%;
    display: inline-flex;
    white-space: nowrap;

    &__wrapper {
      align-items: center;
      display: inline-flex;
      flex-direction: column;
    }

    &__content {
      display: inline-flex;
      position: relative;
    }

    &--readonly {
      pointer-events: none;
    }

    &--hover {

    }
  }
</style>

<style>
  :root {

  }
</style>
<script lang="ts" setup>
</script>