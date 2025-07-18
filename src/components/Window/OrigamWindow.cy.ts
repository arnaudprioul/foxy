import { h } from "vue"
import OrigamWindow from './OrigamWindow.vue'

describe('<OrigamWindow />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamWindow), {})
    })
})
