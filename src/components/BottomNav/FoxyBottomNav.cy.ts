import FoxyBottomNav from './FoxyBottomNav.vue'
import { h } from "vue"

describe('<FoxyBottomNav />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBottomNav), {})
  })
})
