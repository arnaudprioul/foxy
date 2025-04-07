import FoxyParallax from './FoxyParallax.vue'
import { h } from "vue"

describe('<FoxyParallax />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyParallax), {})
  })
})
