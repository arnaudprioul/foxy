import FoxyRow from './FoxyRow.vue'
import { h } from "vue"

describe('<FoxyRow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRow), {})
  })
})
