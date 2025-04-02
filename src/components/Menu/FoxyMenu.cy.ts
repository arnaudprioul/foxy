import FoxyMenu from './FoxyMenu.vue'

describe('<FoxyMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyMenu)
  })
})