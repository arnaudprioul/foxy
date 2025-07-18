import { h } from "vue"
import OrigamSelectionControlGroup from './OrigamSelectionControlGroup.vue'

describe('<OrigamSelectionControlGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSelectionControlGroup), {})
    })
})
