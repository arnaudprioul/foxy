import { h } from "vue"
import OrigamIcon from './OrigamIcon.vue'

describe('<OrigamIcon />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamIcon), {})
    })
})
