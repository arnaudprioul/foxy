import { h } from "vue"
import FoxuiImg from './FoxuiImg.vue'

describe('<FoxuiImg />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiImg), {})
    })
})
