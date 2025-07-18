import { h } from "vue"
import OrigamNumberField from './OrigamNumberField.vue'

describe('<OrigamNumberField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamNumberField), {})
    })
})
