import { h } from "vue"
import OrigamSlideGroup from './OrigamSlideGroup.vue'

describe('<OrigamSlideGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSlideGroup), {})
    })
})
