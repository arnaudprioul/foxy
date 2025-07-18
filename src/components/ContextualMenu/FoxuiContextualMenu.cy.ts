import { h } from "vue"
import FoxuiContextualMenu from './FoxuiContextualMenu.vue'

describe('<FoxuiContextualMenu />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiContextualMenu, {}))
    })
})
