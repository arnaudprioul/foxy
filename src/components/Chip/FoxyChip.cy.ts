import FoxyChip from './FoxyChip.vue'

describe('<FoxyChip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyChip), {})
  })
})
