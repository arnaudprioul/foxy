import { h } from "vue"
import FoxuiLoader from './FoxuiLoader.vue'

describe('<FoxuiLoader />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiLoader), {})
    })
})
