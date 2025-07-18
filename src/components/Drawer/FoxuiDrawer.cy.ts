import { h } from "vue"
import FoxuiDrawer from './FoxuiDrawer.vue'

describe('<FoxuiDrawer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDrawer), {})
    })
})
