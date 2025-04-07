import FoxySlideGroup from './FoxySlideGroup.vue'
import { h } from "vue"

describe('<FoxySlideGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySlideGroup), {})
  })
})
