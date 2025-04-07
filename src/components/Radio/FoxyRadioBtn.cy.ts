import FoxyRadioBtn from './FoxyRadioBtn.vue'
import { h } from "vue"

describe('<FoxyRadioBtn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRadioBtn), {})
  })
})
