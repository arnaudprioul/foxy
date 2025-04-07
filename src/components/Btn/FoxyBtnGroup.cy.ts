import FoxyBtnGroup from './FoxyBtnGroup.vue'
import { h } from "vue"

describe('<FoxyBtnGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBtnGroup), {})
  })
})
