import FoxyDatePickerField from './FoxyDatePickerField.vue'
import { h } from "vue"

describe('<FoxyDatePickerField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDatePickerField), {})
  })
})
