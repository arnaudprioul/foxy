import FoxyParallax from './FoxyParallax.vue'

describe('<FoxyParallax />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyParallax)
  })
})