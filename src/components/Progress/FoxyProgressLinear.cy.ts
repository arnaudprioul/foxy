import FoxyProgressLinear from './FoxyProgressLinear.vue'
import { h } from "vue"

describe('<FoxyProgressLinear />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyProgressLinear), {})
  })
})
