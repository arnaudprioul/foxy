import FoxyCol from './FoxyCol.vue'

describe('<FoxyCol />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyCol)
  })
})