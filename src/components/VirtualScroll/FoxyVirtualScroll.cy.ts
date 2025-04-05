import FoxyVirtualScroll from './FoxyVirtualScroll.vue'

describe('<FoxyVirtualScroll />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyVirtualScroll), {})
  })
})
