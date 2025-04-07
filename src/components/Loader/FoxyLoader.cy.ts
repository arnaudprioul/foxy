import FoxyLoader from './FoxyLoader.vue'
import { h } from "vue"

describe('<FoxyLoader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyLoader), {})
  })
})
