import FoxyFileField from './FoxyFileField.vue'

describe('<FoxyFileField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyFileField)
  })
})