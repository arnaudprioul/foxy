import { h } from "vue"
import OrigamSheet from './OrigamSheet.vue'

describe('<OrigamSheet />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSheet), {})
    })
})
