import FoxyProgress from './FoxyProgress.vue'

describe('<FoxyProgress />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyProgress)
  })
})