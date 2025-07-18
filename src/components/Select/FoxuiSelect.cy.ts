import { h } from "vue"
import FoxuiSelect from './FoxuiSelect.vue'

describe('<FoxuiSelect />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSelect), {})
    })
})
