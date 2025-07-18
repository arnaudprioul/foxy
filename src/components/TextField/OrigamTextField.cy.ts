import { h } from "vue"
import OrigamTextField from './OrigamTextField.vue'

describe('<OrigamTextField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamTextField), {})
    })
})
