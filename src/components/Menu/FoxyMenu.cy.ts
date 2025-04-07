import FoxyMenu from './FoxyMenu.vue'
import { h } from "vue"

describe('<FoxyMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyMenu), {})
  })
})
