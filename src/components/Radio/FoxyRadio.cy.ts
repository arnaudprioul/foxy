import FoxyRadio from './FoxyRadio.vue'
import { h } from "vue"

describe('<FoxyRadio />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRadio), {})
  })
})
