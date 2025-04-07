import FoxyCarousel from './FoxyCarousel.vue'
import { h } from "vue"

describe('<FoxyCarousel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyCarousel), {})
  })
})
