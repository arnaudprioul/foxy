import { h } from "vue"
import FoxyDataList from './FoxyDataList.vue'

describe('<FoxyDataList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyDataList), {})
    })
})
