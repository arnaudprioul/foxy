import { h } from "vue"
import OrigamForm from './OrigamForm.vue'

describe('<OrigamForm />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamForm), {})
    })
})
