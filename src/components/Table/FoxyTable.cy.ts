import FoxyTable from './FoxyTable.vue'

describe('<FoxyTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTable), {})
  })
})
