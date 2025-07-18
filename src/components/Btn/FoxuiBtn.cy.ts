import { h } from "vue"
import FoxuiBtn from './FoxuiBtn.vue'

describe('<FoxuiBtn />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBtn), {})
    })
})
