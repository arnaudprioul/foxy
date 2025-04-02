import FoxyRadioBtn from './FoxyRadioBtn.vue'

describe('<FoxyRadioBtn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyRadioBtn)
  })
})