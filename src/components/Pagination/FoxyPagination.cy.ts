import FoxyPagination from './FoxyPagination.vue'

describe('<FoxyPagination />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyPagination), {})
  })
})
