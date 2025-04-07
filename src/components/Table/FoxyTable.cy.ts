import FoxyTable from './FoxyTable.vue'
import { h } from "vue"

describe('<FoxyTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTable), {})
  })
})
