import { h } from "vue"
import FoxuiSwitch from './FoxuiSwitch.vue'

describe('<FoxuiSwitch />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSwitch), {})
    })
})
