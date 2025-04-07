import FoxyWindow from './FoxyWindow.vue'
import { h } from "vue"

describe('<FoxyWindow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyWindow), {})
  })
})
