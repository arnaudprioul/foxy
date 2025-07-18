import { h } from "vue"
import OrigamDataList from './OrigamDataList.vue'

describe('<OrigamDataList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDataList), {})
    })
})
