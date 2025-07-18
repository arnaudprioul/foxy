import { h } from "vue"
import OrigamDialog from './OrigamDialog.vue'

describe('<OrigamDialog />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDialog), {})
    })
})
