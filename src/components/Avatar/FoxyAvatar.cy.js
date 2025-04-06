import FoxyAvatar from './FoxyAvatar.vue'

describe('<FoxyAvatar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyAvatar), {})
  })
})
