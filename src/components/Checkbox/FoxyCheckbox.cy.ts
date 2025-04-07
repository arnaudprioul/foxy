import FoxyCheckbox from './FoxyCheckbox.vue'
import { h } from "vue"

describe('<FoxyCheckbox />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyCheckbox), {})
  })
})
