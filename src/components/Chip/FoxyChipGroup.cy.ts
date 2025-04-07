import FoxyChipGroup from './FoxyChipGroup.vue'
import { h } from "vue"

describe('<FoxyChipGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyChipGroup), {})
  })
})
