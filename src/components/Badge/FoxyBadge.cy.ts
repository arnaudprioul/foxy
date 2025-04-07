import FoxyBadge from './FoxyBadge.vue'
import { h } from "vue"

describe('<FoxyBadge />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBadge), {})
  })
})
