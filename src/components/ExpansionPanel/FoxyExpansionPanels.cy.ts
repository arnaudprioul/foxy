import FoxyExpansionPanels from './FoxyExpansionPanels.vue'
import { h } from "vue"

describe('<FoxyExpansionPanels />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyExpansionPanels), {})
  })
})
