import { h } from "vue"
import FoxyList from './FoxyList.vue'

describe('<FoxyList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyList), {})
    })
})
