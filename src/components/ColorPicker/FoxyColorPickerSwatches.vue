<template>
  <div
      :class="colorPickerSwatchesClasses"
      :style="colorPickerSwatchesStyles"
  >
    <template v-for="(swatch) in swatches">
      <div class="foxy-color-picker-swatches__swatch">
        <template v-for="(color) in swatch">
          <div
              class="foxy-color-picker-swatches__color"
              @click="handleUpdateColor(color)"
          >
            <div
                :style="{ 'background-color': background(color)}"
            >
              <template v-if="colorHsv && deepEqual(colorHsv, hsva)">
                <foxy-icon
                    :color="getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black'"
                    :icon="MDI_ICONS.CHECK_CIRCLE_OUTLINE"
                    size="x-small"
                />
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyIcon } from "@foxy/components"

  import { useProps } from "@foxy/composables"

  import { MDI_ICONS } from "@foxy/enums"

  import { IColorPickerSwatchesProps } from "@foxy/interfaces"

  import { convertToUnit, deepEqual, getContrast, parseColor, RGBtoCSS, RGBtoHSV } from "@foxy/utils"

  import { computed, StyleValue } from "vue"

  const props = withDefaults(defineProps<IColorPickerSwatchesProps>(), {
    maxHeight: 150
  })

  const emits = defineEmits(['update:colorHsv'])

  const { filterProps } = useProps<IColorPickerSwatchesProps>(props)

  const rgba = (color) => {
    return parseColor(color)
  }
  const hsva = (color) => {
    return RGBtoHSV(rgba(color))
  }
  const background = (color) => {
    return RGBtoCSS(rgba(color))
  }

  const handleUpdateColor = (color) => {
    const colorUpdate = hsva(color)

    if (colorUpdate) {
      emits('update:color-hsv', colorUpdate)
    }
  }

  // CLASS & STYLES

  const colorPickerSwatchesStyles = computed(() => {
    return [
      {
        maxHeight: convertToUnit(props.maxHeight)
      },
      props.style
    ] as StyleValue
  })
  const colorPickerSwatchesClasses = computed(() => {
    return [
      'foxy-color-picker-swatches',
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