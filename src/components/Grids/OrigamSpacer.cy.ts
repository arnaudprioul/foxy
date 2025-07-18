import { h } from "vue"
import OrigamSpacer from './OrigamSpacer.vue'

describe('<OrigamSpacer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSpacer), {})
    })
})
