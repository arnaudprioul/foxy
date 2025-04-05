import FoxyBtnToggle from './FoxyBtnToggle.vue'

describe('<FoxyBtnToggle />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBtnToggle), {})
  })
})
