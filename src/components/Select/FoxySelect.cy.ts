import FoxySelect from './FoxySelect.vue'
import { h } from "vue"

describe('<FoxySelect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySelect), {})
  })
})
