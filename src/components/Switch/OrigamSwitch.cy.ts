import { h } from "vue"
import OrigamSwitch from './OrigamSwitch.vue'

describe('<OrigamSwitch />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSwitch), {})
    })
})
