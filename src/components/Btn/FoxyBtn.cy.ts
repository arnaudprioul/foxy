import FoxyBtn from './FoxyBtn.vue'

describe('<FoxyBtn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBtn), {})
  })
})
