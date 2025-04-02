import FoxyBadge from './FoxyBadge.vue'

describe('<FoxyBadge />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyBadge)
  })
})