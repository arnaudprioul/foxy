import { h } from "vue"
import FoxuiSheet from './FoxuiSheet.vue'

describe('<FoxuiSheet />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSheet), {})
    })
})
