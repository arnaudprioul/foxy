<template>
  <div
      :class="colorPickerPreviewClasses"
      :style="colorPickerPreviewStyles"
  >
    <template v-if="SUPPORTS_EYE_DROPPER">
      <div
          key="eyeDropper"
          class="foxy-color-picker-preview__eye-dropper"
      >
        <foxy-btn
            :density="DENSITY.DEFAULT"
            :icon="MDI_ICONS.EYEDROPPER"
            @click="openEyeDropper"
        />
      </div>
    </template>

    <div class="foxy-color-picker-preview__dot">
      <div :style="{ background: HSVtoCSS(colorHsv ?? COLOR_NULL) }"/>
    </div>

    <div class="foxy-color-picker-preview__sliders">
      <foxy-slider-field
          ref="foxySliderFieldRef"
          :max="360"
          :min="0"
          :model-value="colorHsv?.h"
          :step="0"
          :thumbSize="14"
          :trackSize="8"
          class="foxy-color-picker-preview__track foxy-color-picker-preview__hue"
          hideDetails
          trackFillColor="white"
          v-bind="{...sliderFieldProps}"
          @update:model-value="handleUpdateColorHue"
      />

      <template v-if="!hideAlpha">
        <foxy-slider-field
            ref="foxySliderFieldRef"
            :max="1"
            :min="0"
            :model-value="colorHsv?.a ?? 1"
            :step="1 / 256"
            :thumbSize="14"
            :trackSize="8"
            class="foxy-color-picker-preview__track foxy-color-picker-preview__alpha"
            hideDetails
            trackFillColor="white"
            v-bind="{...sliderFieldProps}"
            @update:model-value="handleUpdateColorAlpha"
        />
      </template>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyBtn, FoxySliderField } from "@foxy/components"

  import { useProps } from "@foxy/composables"

  import { COLOR_NULL, SUPPORTS_EYE_DROPPER } from "@foxy/consts"

  import { DENSITY, MDI_ICONS } from "@foxy/enums"

  import { IColorPickerPreviewProps } from "@foxy/interfaces"

  import { TFoxySliderField } from "@foxy/types"

  import { HSVtoCSS, parseColor, RGBtoHSV } from "@foxy/utils"

  import { computed, onUnmounted, ref, StyleValue } from "vue"

  const props = withDefaults(defineProps<IColorPickerPreviewProps>(), {})

  const emits = defineEmits(['update:colorHsv'])

  const { filterProps } = useProps<IColorPickerPreviewProps>(props)

  const abortController = new AbortController()

  const openEyeDropper = async () => {
    if (!SUPPORTS_EYE_DROPPER) return

    const eyeDropper = new window.EyeDropper()

    try {
      const result = await eyeDropper.open({ signal: abortController.signal })
      const colorHexValue = RGBtoHSV(parseColor(result.sRGBHex))
      emits('update:colorHsv', { ...(props.colorHsv ?? COLOR_NULL), ...colorHexValue })
    } catch (e) {
    }
  }

  const handleUpdateColorHue = (hue) => {
    emits('update:colorHsv', { ...(props.colorHsv ?? COLOR_NULL), hue })
  }
  const handleUpdateColorAlpha = (alpha) => {
    emits('update:colorHsv', { ...(props.colorHsv ?? COLOR_NULL), alpha })
  }

  const foxySliderFieldRef = ref<TFoxySliderField>()

  const sliderFieldProps = computed(() => {
    return foxySliderFieldRef.value?.filterProps(props)
  })

  onUnmounted(() => {
    abortController.abort()
  })

  // CLASS & STYLES

  const colorPickerPreviewStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const colorPickerPreviewClasses = computed(() => {
    return [
      'foxy-color-picker-preview',
      {
        'foxy-color-picker-preview--hide-alpha': props.hideAlpha
      },
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