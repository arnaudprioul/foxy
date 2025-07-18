import { h } from "vue"
import OrigamProgress from './OrigamProgress.vue'

describe('<OrigamProgress />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamProgress), {})
    })
})
