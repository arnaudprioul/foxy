import FoxyCard from './FoxyCard.vue'

describe('<FoxyCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FoxyCard)
  })
})