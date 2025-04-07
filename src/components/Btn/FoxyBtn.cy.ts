import FoxyBtn from './FoxyBtn.vue'
import { h } from "vue"

describe('<FoxyBtn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBtn), {})
  })
})
