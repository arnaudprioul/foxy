import FoxyCol from './FoxyCol.vue'
import { h } from "vue"

describe('<FoxyCol />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyCol), {})
  })
})
