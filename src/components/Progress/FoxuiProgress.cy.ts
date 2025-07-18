import { h } from "vue"
import FoxuiProgress from './FoxuiProgress.vue'

describe('<FoxuiProgress />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiProgress), {})
    })
})
