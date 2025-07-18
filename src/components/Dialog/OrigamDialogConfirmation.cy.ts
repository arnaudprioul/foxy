import { h } from "vue"
import OrigamDialogConfirmation from './OrigamDialogConfirmation.vue'

describe('<OrigamDialogConfirmation />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDialogConfirmation), {})
    })
})
