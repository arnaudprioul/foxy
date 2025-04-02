import FoxySliderField from './FoxySliderField.vue'

describe('<FoxySliderField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxySliderField)
  })
})