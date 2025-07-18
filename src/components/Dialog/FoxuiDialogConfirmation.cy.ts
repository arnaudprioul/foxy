import { h } from "vue"
import FoxuiDialogConfirmation from './FoxuiDialogConfirmation.vue'

describe('<FoxuiDialogConfirmation />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDialogConfirmation), {})
    })
})
