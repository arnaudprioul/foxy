import FoxyDivider from './FoxyDivider.vue'
import { h } from "vue"

describe('<FoxyDivider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDivider), {})
  })
})
