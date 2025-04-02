import FoxyTextField from './FoxyTextField.vue'

describe('<FoxyTextField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyTextField)
  })
})