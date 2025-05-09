import { h } from "vue"
import FoxyForm from './FoxyForm.vue'

describe('<FoxyForm />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyForm), {})
    })
})
