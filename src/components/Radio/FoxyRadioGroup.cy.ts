import FoxyRadioGroup from './FoxyRadioGroup.vue'
import { h } from "vue"

describe('<FoxyRadioGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRadioGroup), {})
  })
})
