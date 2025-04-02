import FoxyTextareaField from './FoxyTextareaField.vue'

describe('<FoxyTextareaField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyTextareaField)
  })
})