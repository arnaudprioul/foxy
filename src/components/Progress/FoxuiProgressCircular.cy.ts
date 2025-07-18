import { h } from "vue"
import FoxuiProgressCircular from './FoxuiProgressCircular.vue'

describe('<FoxuiProgressCircular />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiProgressCircular), {})
    })
})
