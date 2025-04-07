import FoxyCard from './FoxyCard.vue'
import { h } from "vue"

describe('<FoxyCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyCard), {})
  })
})
