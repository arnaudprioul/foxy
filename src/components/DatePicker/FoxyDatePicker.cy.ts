import FoxyDatePicker from './FoxyDatePicker.vue'

describe('<FoxyDatePicker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDatePicker), {})
  })
})
