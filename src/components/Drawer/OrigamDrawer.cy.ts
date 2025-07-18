import { h } from "vue"
import OrigamDrawer from './OrigamDrawer.vue'

describe('<OrigamDrawer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDrawer), {})
    })
})
