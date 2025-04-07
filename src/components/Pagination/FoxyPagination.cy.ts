import FoxyPagination from './FoxyPagination.vue'
import { h } from "vue"

describe('<FoxyPagination />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyPagination), {})
  })
})
