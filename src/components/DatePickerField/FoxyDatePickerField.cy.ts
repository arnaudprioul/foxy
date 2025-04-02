import FoxyDatePickerField from './FoxyDatePickerField.vue'

describe('<FoxyDatePickerField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyDatePickerField)
  })
})