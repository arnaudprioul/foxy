import { h } from "vue"
import FoxuiSliderField from './FoxuiSliderField.vue'

describe('<FoxuiSliderField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSliderField), {})
    })
})
