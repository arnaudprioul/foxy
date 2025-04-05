import FoxyRadioGroup from './FoxyRadioGroup.vue'

describe('<FoxyRadioGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRadioGroup), {})
  })
})
