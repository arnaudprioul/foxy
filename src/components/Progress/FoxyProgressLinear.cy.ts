import FoxyProgressLinear from './FoxyProgressLinear.vue'

describe('<FoxyProgressLinear />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyProgressLinear), {})
  })
})
