import { h } from "vue"
import OrigamCheckbox from './OrigamCheckbox.vue'

describe('<OrigamCheckbox />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamCheckbox), {})
    })
})
