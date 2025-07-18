import { h } from "vue"
import FoxuiBtnToggle from './FoxuiBtnToggle.vue'

describe('<FoxuiBtnToggle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBtnToggle), {})
    })
})
