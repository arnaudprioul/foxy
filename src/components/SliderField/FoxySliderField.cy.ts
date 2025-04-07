import FoxySliderField from './FoxySliderField.vue'
import { h } from "vue"

describe('<FoxySliderField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySliderField), {})
  })
})
