import FoxySelect from './FoxySelect.vue'

describe('<FoxySelect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxySelect)
  })
})