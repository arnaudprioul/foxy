import FoxySheet from './FoxySheet.vue'

describe('<FoxySheet />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxySheet)
  })
})