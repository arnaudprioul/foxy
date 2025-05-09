import { h } from "vue"
import FoxyCheckbox from './FoxyCheckbox.vue'

describe('<FoxyCheckbox />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyCheckbox), {})
    })
})
