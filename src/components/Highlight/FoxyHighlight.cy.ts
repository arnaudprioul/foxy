import { h } from "vue"
import FoxyHighlight from './FoxyHighlight.vue'

describe('<FoxyHighlight />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyHighlight), {})
  })
})
