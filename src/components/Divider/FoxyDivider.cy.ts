import FoxyDivider from './FoxyDivider.vue'

describe('<FoxyDivider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyDivider)
  })
})