import FoxyAppBar from './FoxyAppBar.vue'

describe('<FoxyAppBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyAppBar)
  })
})