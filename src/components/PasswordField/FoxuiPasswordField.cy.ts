import { h } from "vue"
import FoxuiPasswordField from './FoxuiPasswordField.vue'

describe('<FoxuiPasswordField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiPasswordField), {})
    })
})
