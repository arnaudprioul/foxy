import { h } from "vue"
import FoxuiDialog from './FoxuiDialog.vue'

describe('<FoxuiDialog />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDialog), {})
    })
})
