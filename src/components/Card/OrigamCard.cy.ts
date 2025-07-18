import { h } from "vue"
import OrigamCard from './OrigamCard.vue'

describe('<OrigamCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamCard), {})
    })
})
