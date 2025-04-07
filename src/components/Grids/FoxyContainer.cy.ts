import FoxyContainer from './FoxyContainer.vue'
import { h } from "vue"

describe('<FoxyContainer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyContainer), {})
  })
})
