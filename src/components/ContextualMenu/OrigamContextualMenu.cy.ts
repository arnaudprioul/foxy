import { h } from "vue"
import OrigamContextualMenu from './OrigamContextualMenu.vue'

describe('<OrigamContextualMenu />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamContextualMenu, {}))
    })
})
