import { h } from "vue"
import OrigamBtnGroup from './OrigamBtnGroup.vue'

describe('<OrigamBtnGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBtnGroup), {})
    })
})
