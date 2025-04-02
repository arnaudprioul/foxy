import FoxyWindow from './FoxyWindow.vue'

describe('<FoxyWindow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyWindow)
  })
})