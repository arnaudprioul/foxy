import FoxyBtnGroup from './FoxyBtnGroup.vue'

describe('<FoxyBtnGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyBtnGroup)
  })
})