import FoxyBreadcrumb from './FoxyBreadcrumb.vue'

describe('<FoxyBreadcrumb />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyBreadcrumb)
  })
})