import FoxySwitch from './FoxySwitch.vue'

describe('<FoxySwitch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxySwitch)
  })
})