import FoxyColorPickerField from './FoxyColorPickerField.vue'
import { h } from "vue"

describe('<FoxyColorPickerField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyColorPickerField), {})
  })
})
