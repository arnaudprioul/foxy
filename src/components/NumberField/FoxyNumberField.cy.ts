import FoxyNumberField from './FoxyNumberField.vue'
import { h } from "vue"

describe('<FoxyNumberField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyNumberField), {})
  })
})
