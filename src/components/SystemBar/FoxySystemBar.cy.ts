import FoxySystemBar from './FoxySystemBar.vue'

describe('<FoxySystemBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySystemBar), {})
  })
})
