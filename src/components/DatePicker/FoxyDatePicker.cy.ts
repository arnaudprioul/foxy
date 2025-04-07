import FoxyDatePicker from './FoxyDatePicker.vue'
import { h } from "vue"

describe('<FoxyDatePicker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDatePicker), {})
  })
})
