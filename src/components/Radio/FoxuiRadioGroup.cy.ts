import { h } from "vue"
import FoxuiRadioGroup from './FoxuiRadioGroup.vue'

describe('<FoxuiRadioGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiRadioGroup), {})
    })
})
