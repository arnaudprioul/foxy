import { h } from "vue"
import FoxuiCheckbox from './FoxuiCheckbox.vue'

describe('<FoxuiCheckbox />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiCheckbox), {})
    })
})
