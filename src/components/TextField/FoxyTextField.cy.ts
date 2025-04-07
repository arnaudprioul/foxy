import FoxyTextField from './FoxyTextField.vue'
import { h } from "vue"

describe('<FoxyTextField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTextField), {})
  })
})
