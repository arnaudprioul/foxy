import FoxyDataTable from './FoxyDataTable.vue'
import { h } from "vue"

describe('<FoxyDataTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDataTable), {})
  })
})
