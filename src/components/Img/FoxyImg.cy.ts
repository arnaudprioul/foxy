import FoxyImg from './FoxyImg.vue'

describe('<FoxyImg />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyImg), {})
  })
})
