import { h } from "vue"
import OrigamMenu from './OrigamMenu.vue'

describe('<OrigamMenu />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamMenu), {})
    })
})
