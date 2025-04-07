import FoxyTitle from './FoxyTitle.vue'
import { h } from "vue"

describe('<FoxyTitle />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTitle), {})
  })
})
