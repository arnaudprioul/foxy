import { h } from "vue"
import FoxuiBreadcrumbItem from './FoxuiBreadcrumbItem.vue'

describe('<FoxuiBreadcrumbItem />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBreadcrumbItem), {})
    })
})
