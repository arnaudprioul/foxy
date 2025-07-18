import { h } from "vue"
import FoxuiMenu from './FoxuiMenu.vue'

describe('<FoxuiMenu />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiMenu), {})
    })
})
