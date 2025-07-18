import { h } from "vue"
import FoxuiList from './FoxuiList.vue'

describe('<FoxuiList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiList), {})
    })
})
