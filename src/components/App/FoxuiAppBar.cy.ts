import { h } from "vue"

import FoxuiAppBar from './FoxuiAppBar.vue'

describe('<FoxuiAppBar />', () => {
    it('props: title', () => {
        cy.mount(h(FoxuiAppBar, {
            title: 'Cypress',
            order: 1,
            name: 'appBar'
        }))
    })
})
