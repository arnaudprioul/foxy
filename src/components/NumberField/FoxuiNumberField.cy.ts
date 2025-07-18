import { h } from "vue"
import FoxuiNumberField from './FoxuiNumberField.vue'

describe('<FoxuiNumberField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiNumberField), {})
    })
})
