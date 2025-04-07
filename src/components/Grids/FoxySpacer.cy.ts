import FoxySpacer from './FoxySpacer.vue'
import { h } from "vue"

describe('<FoxySpacer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySpacer), {})
  })
})
