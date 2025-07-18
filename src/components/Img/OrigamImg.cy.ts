import { h } from "vue"
import OrigamImg from './OrigamImg.vue'

describe('<OrigamImg />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamImg), {})
    })
})
