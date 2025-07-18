import { h } from "vue"
import FoxuiCard from './FoxuiCard.vue'

describe('<FoxuiCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiCard), {})
    })
})
