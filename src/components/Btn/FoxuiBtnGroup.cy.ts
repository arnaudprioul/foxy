import { h } from "vue"
import FoxuiBtnGroup from './FoxuiBtnGroup.vue'

describe('<FoxuiBtnGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBtnGroup), {})
    })
})
