import FoxyDrawer from './FoxyDrawer.vue'

describe('<FoxyDrawer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyDrawer)
  })
})