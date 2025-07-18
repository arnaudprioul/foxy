import { h } from "vue"
import FoxyPasswordField from './FoxyPasswordField.vue'

describe('<FoxyPasswordField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyPasswordField), {})
    })
})
