import { h } from "vue"
import OrigamList from './OrigamList.vue'

describe('<OrigamList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamList), {})
    })
})
