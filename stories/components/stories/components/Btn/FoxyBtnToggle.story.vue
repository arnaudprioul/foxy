<template>
  <Story
		  :init-state="initialState"
      auto-props-disabled
      group="components"
		  title="Btn/Btn Toggle"
  >
    <Variant title="Default">
	    <template #default="{state}">
		    <foxy-container>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-btn-toggle
                  v-model="state.modelValue"
                  v-bind="state"
                  @update:model-value="logEvent('update:modelValue', $event)"
              >
                <template #item="{item}">
                  <foxy-btn
                      v-bind="item"
                      @group:selected="logEvent('group:selected', $event)"
                  />
                </template>
              </foxy-btn-toggle>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

	    <template #controls="{state}">
        <hst-checkbox
            v-model="state.multiple"
            title="Multiple"
        />

        <hst-checkbox
            v-model="state.mandatory"
            title="Required"
        />

        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.divided"
            title="Divided"
        />
      </template>
    </Variant>

	  <Variant title="Color">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-color
					  v-model:active="state.active"
					  v-model:active-bg-color="state.activeBgColor"
					  v-model:active-color="state.activeColor"
					  v-model:bg-color="state.bgColor"
					  v-model:color="state.color"
					  v-model:hover="state.hover"
					  v-model:hover-bg-color="state.hoverBgColor"
					  v-model:hover-color="state.hoverColor"
			  />
		  </template>
	  </Variant>

	  <Variant title="Border">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-border v-model="state.border"/>
		  </template>
	  </Variant>

	  <Variant title="Padding">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-padding v-model="state.padding"/>
		  </template>
	  </Variant>

	  <Variant title="Margin">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-margin v-model="state.margin"/>
		  </template>
	  </Variant>

	  <Variant title="Density">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-density v-model="state.density"/>
		  </template>
	  </Variant>

	  <Variant title="Elevation">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-elevation v-model="state.elevation"/>
		  </template>
	  </Variant>

	  <Variant title="Rounded">
		  <template #default="{state}">
			  <foxy-container>
				  <foxy-row
						  :align="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-btn-toggle
								  v-model="state.modelValue"
								  v-bind="state"
								  @update:model-value="logEvent('update:modelValue', $event)"
						  >
							  <template #item="{item}">
								  <foxy-btn
										  v-bind="item"
										  @group:selected="logEvent('group:selected', $event)"
								  />
							  </template>
						  </foxy-btn-toggle>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>

		  <template #controls="{state}">
			  <hst-rounded v-model="state.rounded"/>
		  </template>
	  </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxyBtn, FoxyBtnToggle, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxy/enums'
	import { IBtnToggleProps } from "@foxy/interfaces"
	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstElevation,
		HstMargin,
		HstPadding,
		HstRounded
	} from '@stories/components/controls'
	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: IBtnToggleProps = reactive({
		modelValue: 'justify',
		items: [
			{value: 'left', icon: MDI_ICONS.FORMAT_ALIGN_LEFT},
			{value: 'center', icon: MDI_ICONS.FORMAT_ALIGN_CENTER},
			{value: 'right', icon: MDI_ICONS.FORMAT_ALIGN_RIGHT},
			{value: 'justify', icon: MDI_ICONS.FORMAT_ALIGN_JUSTIFY}
		]
	})

	const initialState = () => {
		return state
	}

</script>
<docs lang="md">

</docs>
