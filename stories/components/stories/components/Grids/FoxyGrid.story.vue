<template>
  <Story
      group="components"
      title="Columns"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container>
		      <origam-row>
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of three columns
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
    </Variant>
    <Variant title="Align">
      <template #default>
	      <origam-container>
		      <origam-row
              align="start"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align start
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              align="center"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align center
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              align="end"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align end
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              align="baseline"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align baseline
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row style="height: 150px;">
			      <origam-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align stretch
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row style="height: 150px;">
			      <origam-col
                align="start"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self start
				      </origam-sheet>
			      </origam-col>
			      <origam-col
                align="center"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self center
				      </origam-sheet>
			      </origam-col>
			      <origam-col
                align="end"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Align self end
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
    </Variant>
    <Variant title="Justify">
      <template #default>
	      <origam-container>
		      <origam-row style="height: 150px;">
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify start (default)
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              justify="center"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify center
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              justify="end"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify end
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              justify="space-around"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space around
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              justify="space-between"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space between
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
		      <origam-row
              justify="space-evenly"
              style="height: 150px;"
          >
			      <origam-col
                v-for="n in 2"
                :key="n"
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                Justify space between
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
    </Variant>
    <Variant title="Spacer">
      <template #default>
	      <origam-container>
		      <origam-row>
			      <origam-col
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of two columns
				      </origam-sheet>
			      </origam-col>

			      <origam-spacer/>

			      <origam-col
                cols="12"
                sm="4"
            >
				      <origam-sheet
                  bg-color="#7d6fa1"
                  color="#fff"
              >
                One of two columns
				      </origam-sheet>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
	import { OrigamCol, OrigamContainer, OrigamRow, OrigamSheet, OrigamSpacer } from '@origam/components'
</script>

<docs lang="md">
Grid documentation
</docs>
