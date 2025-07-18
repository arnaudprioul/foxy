import { h } from "vue"
import OrigamBtnToggle from './OrigamBtnToggle.vue'

describe('<OrigamBtnToggle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBtnToggle), {})
    })
})
