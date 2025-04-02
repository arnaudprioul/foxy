import FoxyRadio from './FoxyRadio.vue'

describe('<FoxyRadio />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyRadio)
  })
})