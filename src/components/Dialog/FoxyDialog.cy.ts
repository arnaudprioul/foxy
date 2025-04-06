import FoxyDialog from './FoxyDialog.vue'

describe('<FoxyDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDialog), {})
  })
})
