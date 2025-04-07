import FoxyResponsive from './FoxyResponsive.vue'
import { h } from "vue"

describe('<FoxyResponsive />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyResponsive), {})
  })
})
