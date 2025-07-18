import { h } from "vue"
import FoxuiSlideGroup from './FoxuiSlideGroup.vue'

describe('<FoxuiSlideGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSlideGroup), {})
    })
})
