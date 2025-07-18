import { h } from "vue"
import FoxyNumberField from './FoxyNumberField.vue'

describe('<FoxyNumberField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyNumberField), {})
    })
})
