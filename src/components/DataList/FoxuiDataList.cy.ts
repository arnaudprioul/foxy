import { h } from "vue"
import FoxuiDataList from './FoxuiDataList.vue'

describe('<FoxuiDataList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDataList), {})
    })
})
