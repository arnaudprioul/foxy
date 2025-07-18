<template>
  <Story
      group="components"
      title="Columns"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container>
		      <foxui-row>
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of three columns
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>
    <Variant title="Align">
      <template #default>
	      <foxui-container>
		      <foxui-row
              align="start"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align start
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              align="center"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align center
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              align="end"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align end
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              align="baseline"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align baseline
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row style="height: 150px;">
			      <foxui-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align stretch
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row style="height: 150px;">
			      <foxui-col
                align="start"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self start
				      </foxui-sheet>
			      </foxui-col>
			      <foxui-col
                align="center"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self center
				      </foxui-sheet>
			      </foxui-col>
			      <foxui-col
                align="end"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self end
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>
    <Variant title="Justify">
      <template #default>
	      <foxui-container>
		      <foxui-row style="height: 150px;">
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify start (default)
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              justify="center"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify center
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              justify="end"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify end
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              justify="space-around"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space around
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              justify="space-between"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space between
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
		      <foxui-row
              justify="space-evenly"
              style="height: 150px;"
          >
			      <foxui-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space between
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>
    <Variant title="Spacer">
      <template #default>
	      <foxui-container>
		      <foxui-row>
			      <foxui-col
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of two columns
				      </foxui-sheet>
			      </foxui-col>

			      <foxui-spacer/>

			      <foxui-col
                cols="12"
                sm="4"
            >
				      <foxui-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of two columns
				      </foxui-sheet>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
	import { FoxuiCol, FoxuiContainer, FoxuiRow, FoxuiSheet, FoxuiSpacer } from '@foxui/components'
</script>

<docs lang="md">
Grid documentation
</docs>
