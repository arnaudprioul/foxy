import FoxyCounter from './FoxyCounter.vue'
import { h } from "vue"

describe('<FoxyCounter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyCounter), {})
  })
})
