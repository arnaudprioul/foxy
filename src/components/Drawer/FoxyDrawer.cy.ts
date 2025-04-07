import FoxyDrawer from './FoxyDrawer.vue'
import { h } from "vue"

describe('<FoxyDrawer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDrawer), {})
  })
})
