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
            <div :style="{ 'background-color': background(color)}">
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
  import { COLOR_NULL } from "@foxy/consts"

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
	.foxy-color-picker-swatches {
		overflow-y: auto;

		> div {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			padding: 8px;
		}

		&__swatch {
			display: flex;
			flex-direction: column;
			margin-bottom: 10px
		}

		&__color {
			position: relative;
			height: 18px;
			max-height: 18px;
			width: 45px;
			margin: 2px 4px;
			border-radius: 2px;
			-webkit-user-select: none;
			user-select: none;
			overflow: hidden;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNjPHTo0H8GJGBnZ8eIzGekgwJk+0BsdCtRHEQbBQBbbh0dIGKknQAAAABJRU5ErkJggg==) repeat;
			cursor: pointer;

			> div {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
