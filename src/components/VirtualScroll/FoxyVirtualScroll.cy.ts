import FoxyVirtualScroll from './FoxyVirtualScroll.vue'
import { h } from "vue"

describe('<FoxyVirtualScroll />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyVirtualScroll), {})
  })
})
