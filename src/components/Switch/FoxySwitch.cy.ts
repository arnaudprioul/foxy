import FoxySwitch from './FoxySwitch.vue'
import { h } from "vue"

describe('<FoxySwitch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySwitch), {})
  })
})
