import { h } from "vue"
import OrigamBtn from './OrigamBtn.vue'

describe('<OrigamBtn />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBtn), {})
    })
})
