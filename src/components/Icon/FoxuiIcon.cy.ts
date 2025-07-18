import { h } from "vue"
import FoxuiIcon from './FoxuiIcon.vue'

describe('<FoxuiIcon />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiIcon), {})
    })
})
