import { h } from "vue"
import FoxuiSelectionControlGroup from './FoxuiSelectionControlGroup.vue'

describe('<FoxuiSelectionControlGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSelectionControlGroup), {})
    })
})
